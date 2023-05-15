FROM postgres:latest
# Optionally, specify a specific version of Postgres by replacing 'latest' with the version tag

# Add any additional customizations or configurations if needed

# Copy initialization scripts (optional)
COPY database.sql /docker-entrypoint-initdb.d/

# Expose the default Postgres port
EXPOSE 5432

# Set environment variables (optional)
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=84120Soccer42!!
ENV POSTGRES_DB=apartments

# Start the Postgres server
CMD ["postgres"]