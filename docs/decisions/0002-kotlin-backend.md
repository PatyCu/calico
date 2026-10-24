# 0002 — Kotlin backend

Status: accepted.

Context: Kotlin is the agreed backend language; the first slice needs a small HTTP server and automated validation.

Decision: Kotlin with Spring Boot and a Gradle Kotlin DSL build, using JDK 21 and a checked-in Gradle wrapper. Add only web/JSON dependencies and test support for this slice.

Consequences: familiar HTTP and test infrastructure, one JVM process locally, no database or external service requirements. Persistence technology remains undecided until an approved persistence slice.
