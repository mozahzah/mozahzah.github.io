/*
SPDX-License-Identifier: GPL-2.0-only
Copyright © mozahzah. All rights reserved.
Author: mozahzah 
*/

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);


/* Content loading */


function loadmusicJsonFile() 
{
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '../CMS/music-cms.json', false);
    xhr.send();

    if (xhr.status === 200)
    {
        const data = JSON.parse(xhr.responseText);
        const portfolioBody = document.getElementById('music-section');
        
        data.forEach(musicItem => 
        {
            portfolioBody.innerHTML += `
            <div class="music-container" data-link='${musicItem.link}'">
                <div class="music-image-wrapper">
                    <img src="../CMS/${musicItem.image}" class="music-image" style="width: ${musicItem.zoom}%"></img>
                </div>
                <div class="music-text-section">
                    <h2 class="music-title">${musicItem.title}</h2>
                    <h3 class="music-artist">${musicItem.artist}</h3>
                    <div class="music-info">
                        <p class="music-type">${musicItem.type}</p>
                        <p class="music-year">${musicItem.year}</p>
                    </div>
                </div>
            </div>
            `;
        });
    }
}
loadmusicJsonFile();

let lastClicked = null;

document.querySelectorAll('.music-container').forEach((el) => 
{
    const link = el.dataset.link;
    el.onclick = (event) => 
    {
        if (window.innerWidth > 900) 
        {
            window.open(link, '_blank');
        }
        else 
        {
            if (el == lastClicked && el.matches(":hover"))
            {
                window.open(link, '_blank');
            }
            lastClicked = el;
        }
    };
});

document.addEventListener('click', (e) => 
{
    const clickedEl = e.target.closest('.music-container');
    if (!clickedEl && lastClicked) 
    {
        lastClicked = null;
    }
});