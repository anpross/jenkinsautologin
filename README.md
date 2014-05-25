jenkinsautologin
================
simple chrome extention that:
- checks if you are on a specific host (e.g.: localhost:8080)
- checks if you are not logged in yet
- if so, navigates to the /login page
- enters the username/password credentials you configured
- navigates to a configured path on that host
- switches your browser to full screen mode

as for the config:
- everything is stored in chrome local storage (no syncing)
- chrome local storage is not encrypted - but you should use a dedicated read-only user anyways
