# prometheus
Prometheus and alertmanager and grafana and blackbox exporter with docker compose



Reload configuration with this function in .bashrc
```
function reloadprometheus() {
        curl -X POST http://localhost:9090/-/reload -I
}
```
