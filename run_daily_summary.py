#!/usr/bin/env python3
"""
Скрипт для запуска ежедневных сводок
Можно добавить в cron: 0 9 * * * /path/to/run_daily_summary.py
"""
import sys
import os

# Добавляем путь к проекту
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from backend.daily_summary import send_daily_summaries, send_weekly_summaries
from datetime import datetime

if __name__ == "__main__":
    print(f"Running daily summaries at {datetime.now()}")
    send_daily_summaries()
    
    # Еженедельные сводки только по воскресеньям
    if datetime.now().weekday() == 6:  # Воскресенье
        print("Running weekly summaries")
        send_weekly_summaries()
    
    print("Summaries completed!")
