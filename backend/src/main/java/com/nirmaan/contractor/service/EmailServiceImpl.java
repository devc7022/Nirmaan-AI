package com.nirmaan.contractor.service;

import com.nirmaan.contractor.domain.ContractorQuery;
import com.nirmaan.contractor.domain.ManpowerRequirement;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    @Value("${app.contractor-query.recipient-email:thebumblebrick26@gmail.com}")
    private String recipientEmail;

    @Value("${spring.mail.username:}")
    private String fromEmail;

    @Value("${spring.mail.password:}")
    private String mailPassword;

    @Override
    public boolean sendContractorQueryNotification(ContractorQuery query) {
        if (fromEmail == null || fromEmail.isBlank() || mailPassword == null || mailPassword.isBlank()) {
            log.warn("SMTP credentials (SPRING_MAIL_USERNAME / SPRING_MAIL_PASSWORD) are not set in environment. Skipping email dispatch to {}. Query ID {} saved safely to DB.", recipientEmail, query.getId());
            return false;
        }

        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            helper.setFrom(fromEmail);
            // Always set recipient to the required email: thebumblebrick26@gmail.com
            helper.setTo(recipientEmail);
            helper.setSubject("New Contractor Requirement — BumbleBrick AI (" + query.getCompanyName() + ")");

            String htmlBody = buildHtmlEmailContent(query);
            helper.setText(htmlBody, true);

            mailSender.send(mimeMessage);
            log.info("Contractor requirement email successfully sent to {} for query ID {}", recipientEmail, query.getId());
            return true;
        } catch (Exception e) {
            log.warn("Failed to dispatch contractor query notification email to {}: {}. Submission has been saved to DB.", recipientEmail, e.getMessage());
            return false;
        }
    }

    private String buildHtmlEmailContent(ContractorQuery query) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd MMMM yyyy, hh:mm a z")
                .withZone(ZoneId.systemDefault());
        String submissionTime = query.getCreatedAt() != null ? formatter.format(query.getCreatedAt()) : "Just now";

        StringBuilder manpowerHtml = new StringBuilder();
        if (query.getManpowerRequirements() != null && !query.getManpowerRequirements().isEmpty()) {
            manpowerHtml.append("<table style='width:100%; border-collapse:collapse; margin-top:10px;'>")
                    .append("<tr style='background-color:#18181b; color:#f4f4f5;'>")
                    .append("<th style='padding:10px; border:1px solid #3f3f46; text-align:left;'>Worker Type</th>")
                    .append("<th style='padding:10px; border:1px solid #3f3f46; text-align:right;'>Quantity</th>")
                    .append("</tr>");
            for (ManpowerRequirement req : query.getManpowerRequirements()) {
                manpowerHtml.append("<tr style='border:1px solid #27272a;'>")
                        .append("<td style='padding:8px 10px; border:1px solid #27272a; color:#e4e4e7;'>").append(escapeHtml(req.getWorkerType())).append("</td>")
                        .append("<td style='padding:8px 10px; border:1px solid #27272a; text-align:right; font-weight:bold; color:#f97316;'>").append(req.getQuantity()).append("</td>")
                        .append("</tr>");
            }
            manpowerHtml.append("</table>");
        } else {
            manpowerHtml.append("<p style='color:#a1a1aa;'>No specific manpower workers listed.</p>");
        }

        return "<!DOCTYPE html>"
                + "<html>"
                + "<head><meta charset='UTF-8'></head>"
                + "<body style='font-family: Arial, sans-serif; background-color:#09090b; color:#f4f4f5; padding:20px; margin:0;'>"
                + "  <div style='max-w:600px; margin:0 auto; background-color:#18181b; border:1px solid #27272a; border-radius:12px; overflow:hidden; shadow:0 10px 25px rgba(0,0,0,0.5);'>"
                
                // Header Banner
                + "    <div style='background: linear-gradient(135deg, #f97316 0%, #d97706 100%); padding:24px; text-align:center; color:#ffffff;'>"
                + "      <h1 style='margin:0; font-size:22px; font-weight:800; letter-spacing:-0.5px;'>BumbleBrick AI</h1>"
                + "      <p style='margin:4px 0 0 0; font-size:14px; font-weight:500; opacity:0.9;'>New Contractor Requirement Submission</p>"
                + "    </div>"

                + "    <div style='padding:24px;'>"

                // Contractor Details
                + "      <div style='margin-bottom:24px;'>"
                + "        <h3 style='margin:0 0 12px 0; color:#f97316; font-size:16px; border-bottom:1px solid #27272a; padding-bottom:6px;'>Contractor Details</h3>"
                + "        <p style='margin:6px 0; font-size:14px;'><strong>Contractor Name:</strong> " + escapeHtml(query.getContractorName()) + "</p>"
                + "        <p style='margin:6px 0; font-size:14px;'><strong>Company:</strong> " + escapeHtml(query.getCompanyName()) + "</p>"
                + "        <p style='margin:6px 0; font-size:14px;'><strong>Mobile:</strong> " + escapeHtml(query.getMobileNumber()) + "</p>"
                + "        <p style='margin:6px 0; font-size:14px;'><strong>Email:</strong> <a href='mailto:" + escapeHtml(query.getEmail()) + "' style='color:#f97316;'>" + escapeHtml(query.getEmail()) + "</a></p>"
                + "        <p style='margin:6px 0; font-size:14px;'><strong>Project/Site Name:</strong> " + escapeHtml(query.getProjectName()) + "</p>"
                + "        <p style='margin:6px 0; font-size:14px;'><strong>Project Location:</strong> " + escapeHtml(query.getProjectLocation()) + "</p>"
                + "        <p style='margin:6px 0; font-size:14px;'><strong>Site Address:</strong> " + escapeHtml(query.getSiteAddress()) + "</p>"
                + "      </div>"

                // Manpower Requirements
                + "      <div style='margin-bottom:24px;'>"
                + "        <h3 style='margin:0 0 8px 0; color:#f97316; font-size:16px; border-bottom:1px solid #27272a; padding-bottom:6px;'>Manpower Requirements</h3>"
                +          manpowerHtml.toString()
                + "      </div>"

                // Project Details
                + "      <div style='margin-bottom:24px;'>"
                + "        <h3 style='margin:0 0 12px 0; color:#f97316; font-size:16px; border-bottom:1px solid #27272a; padding-bottom:6px;'>Project Details</h3>"
                + "        <p style='margin:6px 0; font-size:14px;'><strong>Start Date:</strong> " + (query.getWorkStartDate() != null && !query.getWorkStartDate().isBlank() ? escapeHtml(query.getWorkStartDate()) : "N/A") + "</p>"
                + "        <p style='margin:6px 0; font-size:14px;'><strong>Expected Duration:</strong> " + (query.getExpectedDuration() != null && !query.getExpectedDuration().isBlank() ? escapeHtml(query.getExpectedDuration()) : "N/A") + "</p>"
                + "        <p style='margin:6px 0; font-size:14px;'><strong>Working Days:</strong> " + (query.getWorkingDays() != null ? query.getWorkingDays() + " Days" : "N/A") + "</p>"
                + "        <p style='margin:6px 0; font-size:14px;'><strong>Work Description:</strong> " + (query.getWorkDescription() != null && !query.getWorkDescription().isBlank() ? escapeHtml(query.getWorkDescription()) : "None provided") + "</p>"
                + "      </div>"

                // Additional Requirements / Special Instructions
                + "      <div style='margin-bottom:24px;'>"
                + "        <h3 style='margin:0 0 12px 0; color:#f97316; font-size:16px; border-bottom:1px solid #27272a; padding-bottom:6px;'>Additional Instructions</h3>"
                + "        <p style='margin:6px 0; font-size:14px;'> " + (query.getSpecialInstructions() != null && !query.getSpecialInstructions().isBlank() ? escapeHtml(query.getSpecialInstructions()) : "None provided") + "</p>"
                + "      </div>"

                // Footer Timestamp
                + "      <div style='margin-top:30px; padding-top:16px; border-top:1px solid #27272a; font-size:12px; color:#a1a1aa; text-align:center;'>"
                + "        <p style='margin:4px 0;'><strong>Submitted At:</strong> " + submissionTime + "</p>"
                + "        <p style='margin:4px 0;'>BumbleBrick AI — Intelligent Construction Management Platform</p>"
                + "      </div>"

                + "    </div>"
                + "  </div>"
                + "</body>"
                + "</html>";
    }

    private String escapeHtml(String text) {
        if (text == null) return "";
        return text.replace("&", "&amp;")
                .replace("<", "&lt;")
                .replace(">", "&gt;")
                .replace("\"", "&quot;")
                .replace("'", "&#39;");
    }
}
