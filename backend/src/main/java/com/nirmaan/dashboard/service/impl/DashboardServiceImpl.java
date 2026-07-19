package com.nirmaan.dashboard.service.impl;

import com.nirmaan.attendance.entity.Attendance;
import com.nirmaan.dashboard.dto.*;
import com.nirmaan.dashboard.service.DashboardService;
import com.nirmaan.site.domain.ConstructionSiteStatus;
import com.nirmaan.worker.domain.WorkerStatus;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DashboardServiceImpl implements DashboardService {

    private final EntityManager entityManager;

    @Override
    public DashboardResponseDto getDashboard() {
        LocalDate today = LocalDate.now();

        // 1. Worker Statistics
        WorkerStatisticsDto workerStats = getWorkerStatistics();

        // 2. Site Statistics
        SiteStatisticsDto siteStats = getSiteStatistics();

        // 3. Today's Attendance & Labour Cost Statistics
        AttendanceAndLabourTodayDto todayStats = getTodayAttendanceAndLabour(today, workerStats.activeWorkers());

        // 4. Weekly and Monthly Labour Costs
        BigDecimal weeklyLabourCost = getLabourCostForRange(today.minusDays(6), today);
        BigDecimal monthlyLabourCost = getLabourCostForRange(today.withDayOfMonth(1), today);

        LabourStatisticsDto labourStats = new LabourStatisticsDto(
                todayStats.todayLabourCost(),
                weeklyLabourCost,
                monthlyLabourCost,
                todayStats.averageHoursWorkedToday()
        );

        // 5. Recent Attendance (Latest 10)
        List<RecentAttendanceDto> recentAttendance = getRecentAttendance();

        // 6. Top Active Sites (Top 5)
        List<TopSiteDto> topSites = getTopActiveSites(today);

        // 7. Skill Distribution
        Map<String, Long> skillDistribution = getSkillDistribution();

        return new DashboardResponseDto(
                workerStats,
                todayStats.attendanceStatistics(),
                siteStats,
                labourStats,
                recentAttendance,
                topSites,
                skillDistribution
        );
    }

    private WorkerStatisticsDto getWorkerStatistics() {
        List<Object[]> workerCounts = entityManager.createQuery(
                "SELECT w.status, COUNT(w.id) FROM Worker w GROUP BY w.status", Object[].class)
                .getResultList();

        long totalWorkers = 0;
        long activeWorkers = 0;
        long inactiveWorkers = 0;

        for (Object[] row : workerCounts) {
            WorkerStatus status = (WorkerStatus) row[0];
            long count = (Long) row[1];
            totalWorkers += count;
            if (status == WorkerStatus.ACTIVE) {
                activeWorkers = count;
            } else if (status == WorkerStatus.INACTIVE) {
                inactiveWorkers = count;
            }
        }

        return new WorkerStatisticsDto(totalWorkers, activeWorkers, inactiveWorkers);
    }

    private SiteStatisticsDto getSiteStatistics() {
        List<Object[]> siteCounts = entityManager.createQuery(
                "SELECT s.status, COUNT(s.id) FROM ConstructionSite s GROUP BY s.status", Object[].class)
                .getResultList();

        long totalSites = 0;
        long activeSites = 0;
        long completedSites = 0;

        for (Object[] row : siteCounts) {
            ConstructionSiteStatus status = (ConstructionSiteStatus) row[0];
            long count = (Long) row[1];
            totalSites += count;
            if (status == ConstructionSiteStatus.ACTIVE) {
                activeSites = count;
            } else if (status == ConstructionSiteStatus.COMPLETED) {
                completedSites = count;
            }
        }

        return new SiteStatisticsDto(totalSites, activeSites, completedSites);
    }

    private AttendanceAndLabourTodayDto getTodayAttendanceAndLabour(LocalDate today, long activeWorkers) {
        Object[] todayStats = entityManager.createQuery(
                "SELECT " +
                "  COUNT(CASE WHEN a.present = true THEN 1 END), " +
                "  AVG(a.hoursWorked), " +
                "  SUM(a.hoursWorked * w.hourlyRate) " +
                "FROM Attendance a " +
                "JOIN a.worker w " +
                "WHERE a.attendanceDate = :today AND a.deleted = false", Object[].class)
                .setParameter("today", today)
                .getSingleResult();

        long presentToday = todayStats[0] != null ? (Long) todayStats[0] : 0L;
        double averageHoursWorkedToday = todayStats[1] != null ? (Double) todayStats[1] : 0.0;

        BigDecimal todayLabourCost = BigDecimal.ZERO;
        if (todayStats[2] != null) {
            if (todayStats[2] instanceof BigDecimal bd) {
                todayLabourCost = bd;
            } else if (todayStats[2] instanceof Number num) {
                todayLabourCost = BigDecimal.valueOf(num.doubleValue());
            }
        }

        // Apply division by 8 according to rule: Today's labour cost = Sum(hoursWorked * dailyWage / 8)
        // Since dailyWage is represented as hourlyRate * 8, hoursWorked * hourlyRate * 8 / 8 = hoursWorked * hourlyRate.
        // The JPQL query computes SUM(hoursWorked * hourlyRate) directly.

        long absentToday = Math.max(0L, activeWorkers - presentToday);
        double attendancePercentage = 0.0;
        if (activeWorkers > 0) {
            attendancePercentage = ((double) presentToday / activeWorkers) * 100.0;
        }

        AttendanceStatisticsDto attendanceStats = new AttendanceStatisticsDto(
                presentToday,
                absentToday,
                attendancePercentage
        );

        return new AttendanceAndLabourTodayDto(attendanceStats, todayLabourCost, averageHoursWorkedToday);
    }

    private BigDecimal getLabourCostForRange(LocalDate start, LocalDate end) {
        Object result = entityManager.createQuery(
                "SELECT SUM(a.hoursWorked * w.hourlyRate) " +
                "FROM Attendance a " +
                "JOIN a.worker w " +
                "WHERE a.attendanceDate >= :start AND a.attendanceDate <= :end AND a.deleted = false")
                .setParameter("start", start)
                .setParameter("end", end)
                .getSingleResult();

        if (result == null) {
            return BigDecimal.ZERO;
        }
        if (result instanceof BigDecimal bd) {
            return bd;
        } else if (result instanceof Number num) {
            return BigDecimal.valueOf(num.doubleValue());
        }
        return BigDecimal.ZERO;
    }

    private List<RecentAttendanceDto> getRecentAttendance() {
        List<Attendance> recent = entityManager.createQuery(
                "SELECT a FROM Attendance a " +
                "JOIN FETCH a.worker w " +
                "JOIN FETCH a.site s " +
                "WHERE a.deleted = false " +
                "ORDER BY a.attendanceDate DESC, a.createdAt DESC", Attendance.class)
                .setMaxResults(10)
                .getResultList();

        return recent.stream()
                .map(a -> new RecentAttendanceDto(
                        a.getWorker().getName(),
                        a.getSite().getName(),
                        a.getAttendanceDate(),
                        a.getHoursWorked(),
                        a.getPresent()
                ))
                .collect(Collectors.toList());
    }

    private List<TopSiteDto> getTopActiveSites(LocalDate today) {
        List<Object[]> topSitesList = entityManager.createQuery(
                "SELECT s.name, COUNT(a.id) as presentCount " +
                "FROM Attendance a " +
                "JOIN a.site s " +
                "WHERE a.attendanceDate = :today AND a.present = true AND a.deleted = false " +
                "GROUP BY s.id, s.name " +
                "ORDER BY COUNT(a.id) DESC, s.name ASC", Object[].class)
                .setParameter("today", today)
                .setMaxResults(5)
                .getResultList();

        return topSitesList.stream()
                .map(row -> new TopSiteDto(
                        (String) row[0],
                        (Long) row[1]
                ))
                .collect(Collectors.toList());
    }

    private Map<String, Long> getSkillDistribution() {
        List<Object[]> skillsList = entityManager.createQuery(
                "SELECT skill, COUNT(w.id) " +
                "FROM Worker w " +
                "JOIN w.skills skill " +
                "GROUP BY skill " +
                "ORDER BY COUNT(w.id) DESC", Object[].class)
                .getResultList();

        return skillsList.stream()
                .collect(Collectors.toMap(
                        row -> (String) row[0],
                        row -> (Long) row[1],
                        (v1, v2) -> v1,
                        LinkedHashMap::new
                ));
    }

    private record AttendanceAndLabourTodayDto(
            AttendanceStatisticsDto attendanceStatistics,
            BigDecimal todayLabourCost,
            Double averageHoursWorkedToday
    ) {}
}
