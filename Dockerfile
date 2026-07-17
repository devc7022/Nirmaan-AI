# Stage 1: Build stage using Maven and JDK 21
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app

# Copy the pom.xml and source code
COPY backend/pom.xml backend/pom.xml
COPY backend/src backend/src

# Package the application (skip tests for faster deployment builds)
RUN mvn -f backend/pom.xml clean package -DskipTests

# Stage 2: Runtime stage using lightweight JRE 21
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app

# Copy the packaged jar file from build stage
COPY --from=build /app/backend/target/*.jar app.jar

# Expose default Spring Boot port (Render overrides this dynamically via PORT env variable)
EXPOSE 8080

# Execute the application
ENTRYPOINT ["java", "-jar", "app.jar"]
