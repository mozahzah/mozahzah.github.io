/*
SPDX-License-Identifier: GPL-2.0-only
Copyright © 2024 mozahzah. All rights reserved.
Author: mozahzah 
*/

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
const homeBackgroundVideo = document.getElementById("home-background-video");

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

    let errorPlayingVideo = true;
    const iframe = document.getElementById('home-background-video');
    const loader = document.getElementById('loader-container');
    if (iframe)
    {
        const player = new Vimeo.Player(iframe);
        if (player)
        {
            errorPlayingVideo = false;
            player.on('play', function () 
            {
                if (loader)
                {
                    loader.classList.add('hidden');
                }
            });
        }
    }
    
    if (errorPlayingVideo && loader)
    {
        loader.classList.add('hidden');
    }

    updateActiveNavLink();
});


/* Setup */


function setupDesktop()
{ 
    document.addEventListener("mousemove", onMouseMove, false);
    window.addEventListener('resize', onWindowResize);
    window.addEventListener('scroll', onWindowScroll);

    document.querySelectorAll('a[href^="#"]').forEach(anchor => 
    {
        anchor.addEventListener('click', function (e) 
        {
            e.preventDefault();
      
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
      
            const targetPosition = targetElement.offsetTop - 115;
      
            window.scrollTo(
            {
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
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


/* Events */


function onWindowResize() 
{
    if (window.location)
    {
        // window.location.reload();
    }
}

function onWindowScroll() 
{
    updateActiveNavLink();
}

function onMouseMove(mouseEvent)
{
    if (homeBackgroundVideo)
    {
        homeBackgroundVideo.style.left = 50 - mouseEvent.clientX / 450 + "%";
        homeBackgroundVideo.style.top = 50 - mouseEvent.clientY / 450 + "%";
    }
}


/* Helpers */


function updateActiveNavLink() 
{
    const navLinks = document.querySelectorAll('a[href^="#"]');
    const scrollPosition = window.scrollY + 100;
    let activeLink = null;
    let closestDistance = Infinity;

    navLinks.forEach(link => 
    {
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) 
        {
            const distance = Math.abs(targetElement.offsetTop - scrollPosition);
            if (distance < closestDistance) 
            {
                closestDistance = distance;
                activeLink = link;
            }
        }
        link.classList.remove('active');
    });

    if (activeLink) 
    {
        activeLink.classList.add('active');
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


/* Content loading */


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
            let toolsDiv = '<div class="project-tools">';
            projectItem.tools.forEach(tool => 
            {
                toolsDiv += `<a class="project-tools-item">${tool}</a>`;
            });
            toolsDiv += '</div>';

            portfolioBody.innerHTML += `
            <div class="project-container">
                <div class="project-image-wrapper" onclick="window.open('${projectItem.link}', '_blank')">
                    <a class="arrow">→</a>
                    <img src="../CMS/${projectItem.image}" class="project-image" style="width: ${projectItem.zoom}%"></img>
                </div>
                <div class="project-text-section">
                    <h3 class="project-title">${projectItem.title}</h3>
                    <p class="project-description">${projectItem.description}</p>
                    ${toolsDiv}
                </div>
            </div>
            `;
        });

        const projectContainers = document.getElementsByClassName("project-container");
        if (projectContainers) 
        {
            for (let i = 0; i < projectContainers.length; i++) 
            {
                const projectItem = projectContainers.item(i);
                const imageWrapper = projectItem.querySelector(".project-image-wrapper");
                const textSection = projectItem.querySelector(".project-text-section");
                if (i % 2 !== 0) 
                {
                    projectItem.style.flexDirection = "row-reverse";
                    imageWrapper.classList.add("add-right-border-radius");
                    textSection.classList.add("add-left-border-radius");
                }
                else
                {
                    projectItem.style.flexDirection = "row";
                    imageWrapper.classList.add("add-left-border-radius");
                    textSection.classList.add("add-right-border-radius");
                }
            }
        }
    }
}
loadProjectsJsonFile();