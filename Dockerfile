# Usa una imagen base de Ubuntu 22.04
FROM ubuntu:22.04

# Instala dependencias del sistema
RUN apt-get update && \
    apt-get install -y curl gnupg build-essential && \
    curl -sL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

# Instala Meteor
RUN curl https://install.meteor.com/ | sh

# Establece el directorio de trabajo
WORKDIR /app

# Permitir que Meteor se ejecute como superusuario en Docker
ENV METEOR_ALLOW_SUPERUSER=true

# Copia los archivos necesarios para instalar las dependencias
COPY package*.json ./
COPY settings.json ./

# Instala dependencias de npm usando Meteor
RUN meteor npm install --allow-superuser

# Copia el resto del código de la aplicación
COPY . .

# Compila la aplicación de Meteor para producción
RUN meteor build --directory /app/build --allow-superuser --server-only

# Configura el directorio de la aplicación compilada como el de trabajo
WORKDIR /app/build/bundle
RUN (cd programs/server && npm install)

# Expone el puerto en el contenedor
EXPOSE 3000

# Variables de entorno
ENV MONGO_URL=mongodb://mongo:27017/meteor
ENV ROOT_URL=http://localhost:3000
# ENV ROOT_URL=https://geobiocolombia.online
ENV PORT=3000

# Inicia la aplicación
CMD ["node", "main.js", "--settings", "/app/settings.json"]
