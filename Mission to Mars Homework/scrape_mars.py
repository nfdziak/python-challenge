import pandas as pd
import os
from bs4 import BeautifulSoup as bs
import requests
from splinter import Browser
import html5lib
import urllib.parse


def scrape():
    executable_path = {'executable_path': 'chromedriver.exe'}
    browser = Browser('chrome', **executable_path, headless=False)
    mars_data = {}

    url = 'https://mars.nasa.gov/news/?page=0&per_page=40&ordeted_at+desc&search=&category=19%2C165%2C184%2C204&blank_scope=Latest'
    browser.visit(url)

    soup = bs(browser.html, 'html.parser')
   
    mars_data["title"] = soup.find("div", class_="content_title").text
   
    mars_data["news_p"] = soup.find("div", class_="article_teaser_body").text
   
    url = 'https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars'
    browser.visit(url)

    xpath = '//*[@id="full_image"]'
    results = browser.find_by_xpath(xpath)
    img = results[0]
    img.click()
    import time
    time.sleep(5)
    html = browser.html
    soup = bs(html, 'lxml')
    featured_image_url= soup.find("img", class_="fancybox-image")["src"]
    

    base = 'https://www.jpl.nasa.gov'
    mars_data["featured_image"]=urllib.parse.urljoin(base, featured_image_url)

    url = 'https://twitter.com/marswxreport?lang=en&lang=en'
    browser.visit(url)

    html = browser.html
    soup = bs(html, "html.parser")
    mars_data["mars_weather"] = soup.select_one("div p:nth-of-type(5)").text
    
    url = 'https://space-facts.com/mars/'

    # Mars facts
    tables = pd.read_html(url)
    mars_data["table"] = tables[0].to_html()

    url = "https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars"
    response = requests.get(url)
               
    browser.visit(url)

    soup = bs(browser.html, 'html.parser')

    hemisphere_title = soup.select_one("div h2:nth-of-type(1)").text
    
    hemisphere_title4 = soup.select_one("div h3:nth-of-type(5)").text

    hemisphere_title3 = soup.select_one("div h3:nth-of-type(6)").text

    hemisphere_title2 = soup.select_one("div h3:nth-of-type(8)").text


    # click on 1st hemisphere title
    xpath = '//*[@id="product-section"]/div[2]/div[1]/a/img'
    results = browser.find_by_xpath(xpath)
    img = results[0]
    img.click()
    import time
    time.sleep(5)

    # get the full image link
    html = browser.html
    soup = bs(html, 'lxml')
    parent_div = soup.find('div', class_= 'downloads')
    link = parent_div.find('a')
    mars_data["img_url"] = link['href']
    mars_data["hemisphere_title"] = soup.select_one("div h2:nth-of-type(1)").text

       
     # return to previous page
    xpath = '//*[@id="splashy"]/div[1]/div[1]/div[3]/section/a'
    results = browser.find_by_xpath(xpath)
    button = results[0]
    button.click()
    import time
    time.sleep(5)

    # click on 2nd hemisphere title
    xpath = '//*[@id="product-section"]/div[2]/div[2]/div/a/h3'
    results = browser.find_by_xpath(xpath)
    img = results[0]
    img.click()
    import time
    time.sleep(5)

    # get the full image link
    html = browser.html
    soup = bs(html, 'lxml')
    parent_div = soup.find('div', class_= 'downloads')
    link = parent_div.find('a')
    mars_data["img_url2"] = link['href']
    mars_data["hemisphere_title2"] = soup.select_one("div h3:nth-of-type(8)").text
      
     # return to previous page 
    xpath = '//*[@id="splashy"]/div[1]/div[1]/div[3]/section/a'
    results = browser.find_by_xpath(xpath)
    button = results[0]
    button.click()
    import time
    time.sleep(5)

    # click on 3rd hemisphere title
    xpath = '//*[@id="product-section"]/div[2]/div[3]/div/a/h3'
    results = browser.find_by_xpath(xpath)
    img = results[0]
    img.click()
    import time
    time.sleep(5)


    # get the full image link
    html = browser.html
    soup = bs(html, 'lxml')
    parent_div = soup.find('div', class_= 'downloads')
    link = parent_div.find('a')
    mars_data["img_url3"] = link['href']
    mars_data["hemisphere_title3"] = soup.select_one("div h3:nth-of-type(6)").text
      
    
     # return to previous page 
    xpath = '//*[@id="splashy"]/div[1]/div[1]/div[3]/section/a'
    results = browser.find_by_xpath(xpath)
    button = results[0]
    button.click()
    import time
    time.sleep(5)

    # click on 4th hemisphere title
    xpath = '//*[@id="product-section"]/div[2]/div[4]/div/a/h3'
    results = browser.find_by_xpath(xpath)
    img = results[0]
    img.click()
    import time
    time.sleep(5)

    # get the full image link
    html = browser.html
    soup = bs(html, 'lxml')
    parent_div = soup.find('div', class_= 'downloads')
    link = parent_div.find('a')
    mars_data["img_url4"] = link['href']
    mars_data["hemisphere_title4"] = soup.select_one("div h3:nth-of-type(5)").text

   
    return mars_data
  




















































































































































































