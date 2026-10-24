# 0002 — Kotlin backend

Status: accepted.

## Context

Kotlin is the agreed backend language. The initial feature needs HTTP and automated tests.

## Decision

Use Kotlin, Spring Boot, JDK 21, Gradle Kotlin DSL, and a checked-in Gradle wrapper. Initially include only web/JSON dependencies and test support.

## Consequences

The backend uses one JVM process and requires no external services. Choose persistence technology when implementing persistence.
