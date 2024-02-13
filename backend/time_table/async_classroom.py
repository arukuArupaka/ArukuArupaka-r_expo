import aiohttp
import asyncio
from lxml import html
from .fetch_classroom import fetch_classroom

async def async_class(urls):
    tasks = []
    for url in urls:
        task = asyncio.create_task(fetch_classroom(url))
        tasks.append(task)
    result = await asyncio.gather(*tasks)
    return result