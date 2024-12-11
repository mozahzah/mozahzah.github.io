/*
SPDX-License-Identifier: GPL-2.0-only
Copyright © 2024 mozahzah. All rights reserved.
Author: mozahzah 
*/

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 991;
const homeBackgroundVideo = document.getElementById("home-background-video");
const spotlight = document.getElementById("spotlight");

document.addEventListener('DOMContentLoaded', function () 
{
    if (isMobile)
    {
        setupMobile()
    }
    else
    {
        setupDesktop()
    }

    window.addEventListener('resize', onWindowResize);
    
    const iframe = document.getElementById('home-background-video');
    const player = new Vimeo.Player(iframe);
    player.on('play', function () 
    {
        const loader = document.getElementById('loader-container');
        loader.classList.add('hidden');
    }); 
});

function onWindowResize() 
{
    if (window.location)
    {
        window.location.reload();
    }
}

function setupDesktop()
{ 
    document.addEventListener("mousemove", onMouseMove, false);
}

function onMouseMove(mouseEvent)
{
    if (homeBackgroundVideo)
    {
        homeBackgroundVideo.style.left = 50 - mouseEvent.clientX / 200 + "%";
        homeBackgroundVideo.style.top = 50 - mouseEvent.clientY / 200 + "%";
    }

    if (spotlight)
    {
        spotlight.style.left = `${mouseEvent.pageX}px`;
        spotlight.style.top = `${mouseEvent.pageY}px`;
    }
}

function setupMobile()
{
    if ('DeviceOrientationEvent' in window && isMobile) 
    {
        window.addEventListener("deviceorientation", (event) => 
        {
            handleOrientationEvent(event.beta, event.gamma, event.alpha);
        }, true);
    }
}

const handleOrientationEvent = (frontToBack, leftToRight, rotateDegrees) => 
{
    if (homeBackgroundVideo && frontToBack && leftToRight && rotateDegrees)
    {
        homeBackgroundVideo.left += -leftToRight + "%";
        homeBackgroundVideo.top += -frontToBack + "%";
    }
};

function loadProjectsJsonFile() 
{
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '../CMS/projects-cms.json', false);
    xhr.send();

    if (xhr.status === 200)
    {
        const data = JSON.parse(xhr.responseText);
        const portfolioBody = document.getElementById('projects-section');

        data.forEach(projectItem => 
        {
            portfolioBody.innerHTML += `
            <div onclick="window.open('${projectItem.link}', '_blank')" class="project-container">
                <div class="sub-section-sidebar">
                    <div class="image-wrapper">
                        <img src="../CMS/${projectItem.image}" class="project-image"></img>
                    </div>
                </div>
                <div class="sub-section-text-block">
                    <h3 class="project-title">${projectItem.title}</h3>
                    <p class="project-description">${projectItem.description}</p>
                </div>
            </div>
            `;
        });
    }
}

loadProjectsJsonFile();