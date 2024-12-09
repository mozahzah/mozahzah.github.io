/*
SPDX-License-Identifier: GPL-2.0-only
Copyright © 2024 mozahzah. All rights reserved.
Author: mozahzah 
*/

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 991;
const backgroundVideos = document.getElementsByClassName("background-video");

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
    if (backgroundVideos)
    {
        for (var backgroundVideo of backgroundVideos)
        {
            if (backgroundVideo instanceof HTMLElement)
            {
                backgroundVideo.style.left = 50 - mouseEvent.clientX / 200 + "%";
                backgroundVideo.style.top = 50 - mouseEvent.clientY / 200 + "%";
            }
        }
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
    if (backgroundVideos && frontToBack && leftToRight && rotateDegrees)
    {
        backgroundVideos.left += -leftToRight + "%";
        backgroundVideos.top += -frontToBack + "%";
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