package com.nirmaan;

import com.nirmaan.common.config.JwtProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditorAware")
@EnableConfigurationProperties(JwtProperties.class)
public class NirmaanApplication {
    public static void main(String[] args) {
        SpringApplication.run(NirmaanApplication.class, args);
    }
}
