## Project Overview

Projeto de uma API backend de um trabalho de IOT-A2 da faculdade, ele recebe e envia comandos para o firmware do dispositivo via MQTT, e recebe e envia informações para o frontend via HTTP, precisa de uma conexão com um broker MQTT (mosquitto), também salva informações em um banco de dados.

## Installation

1. **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd BackendIOT_A2
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

## Usage

- The backend listen and send MQTT messages from IoT devices and forwards relevant data or commands to the frontend via HTTP endpoints.
- HTTP requests from the frontend are processed and, if necessary, translated into MQTT messages for the devices.
- Run SQL script to create database.

## Requirements

- Node.js and npm installed
- Access to an MQTT broker

## Create database

- Restore SQL Dump script on archive:
```
database.sql
```

## Running the Project

```bash
npm start
```

Configure your MQTT broker and HTTP endpoints as needed in the project configuration files.