import aiohttp
import asyncio
from lxml import html

async def fetch_classroom(url):
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            content = await response.text()
            tree = html.fromstring(content)
            element = tree.xpath("//div[@class='contents']/div/div[2]/div/div[2]")
            if element:           #/html/body/div[2]/div[2]/div/div/div[2]/div/div[2]
                classroom = element[0].text_content()
                return classroom
            else:
                print('Not Found')
                return 'Not Found'

