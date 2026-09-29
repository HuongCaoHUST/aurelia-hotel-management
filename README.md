# Aurelia Hotel Management

Aurelia Hotel Management is a web-based hotel management system designed for a luxury hotel in Ha Long.

## Main Features

- Room search and booking
- Customer management
- Check-in / Check-out
- Room status management
- Housekeeping management
- Equipment and maintenance tracking
- Payment management
- Staff and role management
- Monitoring and system logs

## Tech Stack

- React
- Java Spring Boot
- MySQL
- Redis
- Kafka
- MinIO
- Nginx
- Docker
- Prometheus
- Grafana
- Loki
- OpenTelemetry
- Grafana Tempo

## System Structure

```text
Customer Web ─┐
              ├── Nginx ── Spring Boot API ── MySQL
Staff Web ────┘                    │
                                   ├── Redis
                                   ├── MinIO
                                   └── Kafka