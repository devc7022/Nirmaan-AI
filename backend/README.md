    # Nirmaan API

Spring Boot 3.5 / Java 21 API foundation. Business features intentionally have not been created.

## Run locally

Set `DB_URL`, `DB_USERNAME`, `DB_PASSWORD`, and a `JWT_SECRET` of at least 32 bytes, then run. The secret may be Base64-encoded or a raw string.

```bash
mvn spring-boot:run
```

For PowerShell, for example:

```powershell
$env:DB_URL = 'jdbc:postgresql://localhost:5432/nirmaan'
$env:DB_USERNAME = 'postgres'
$env:DB_PASSWORD = '<your PostgreSQL password>'
$env:JWT_SECRET = '<Base64-encoded 256-bit secret>'
mvn spring-boot:run
```

The database role must be able to connect to the `nirmaan` database. No fallback database password is configured.

Swagger UI is available at `/swagger-ui/index.html` and OpenAPI JSON at `/v3/api-docs`.
