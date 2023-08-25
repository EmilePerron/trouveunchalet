# TLS Certificates

## Trusting the Authority

With a standard installation, the authority used to sign certificates generated 
in the Caddy container is not trusted by your local machine.

Caddy usually handles this automatically, but [it cannot do so when it runs 
within a Docker container](https://caddy.community/t/untrusted-certificate/18167/4).

You must add the authority to the trust store of the host, by followying the 
steps below while your containers are running.

**For Windows**

Make sure you open your terminal in Admin mode.  
Then, run the commands below.

If you are using Powershell:
```bash
docker compose cp app:/root/.local/share/caddy/pki/authorities/local/root.crt $env:TEMP/root.crt && certutil -addstore -f "ROOT" $env:TEMP/root.crt
```

If you don't use Powershell (ex.: CMD / Command Prompt):

```bash
docker compose cp app:/root/.local/share/caddy/pki/authorities/local/root.crt %TEMP%/root.crt && certutil -addstore -f "ROOT" %TEMP%/root.crt
```

**For Mac:**
```bash
docker cp $(docker compose ps -q app):/root/.local/share/caddy/pki/authorities/local/root.crt /tmp/root.crt && sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain /tmp/root.crt
```

**For Linux**
```bash
docker cp $(docker compose ps -q app):/root/.local/share/caddy/pki/authorities/local/root.crt /usr/local/share/ca-certificates/root_app.crt && sudo update-ca-certificates
```
