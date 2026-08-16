FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app ./app

RUN useradd --create-home --uid 1000 appuser
USER appuser

EXPOSE 8080

# One worker per container: Cloud Run scales by instance, and extra worker
# processes would each keep their own in-memory rate-limit counters.
CMD ["sh", "-c", "uvicorn app.presentation.main:app --host 0.0.0.0 --port ${PORT:-8080} --workers 1"]
