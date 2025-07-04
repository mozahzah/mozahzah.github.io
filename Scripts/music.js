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
            <div class="music-container" onclick="window.open('${musicItem.link}', '_blank')">
                <div class="music-image-wrapper">
                    <img src="../CMS/${musicItem.image}" class="music-image" style="width: ${musicItem.zoom}%"></img>
                </div>
                <div class="music-text-section">
                    <h2 class="music-title">${musicItem.title}</h2>
                    <h3 class="music-artist">${musicItem.artist}</h3>
                    <p class="music-year">${musicItem.year}</p>
                    <p class="music-type">${musicItem.type}</p>
                </div>
            </div>
            `;
        });
    }
}
loadmusicJsonFile();