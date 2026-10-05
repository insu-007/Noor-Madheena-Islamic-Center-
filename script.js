/**
 * Noor Madeena Meelad Arts Fest 2026 - Interactive Script
 * Handles view transitions, side drawer toggling, modal content generation,
 * live search filtering, and state management.
 */

 document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Elements ---
    const menuToggleBtn = document.getElementById('menuToggleBtn');
    const drawerOverlay = document.getElementById('drawerOverlay');
    const drawerMenu = document.getElementById('drawerMenu');
    const drawerCloseBtn = document.getElementById('drawerCloseBtn');

    const scoreboardBtn = document.getElementById('scoreboardBtn');
    const offStageBtn = document.getElementById('offStageBtn');
    const onStageBtn = document.getElementById('onStageBtn');

    const navHomeBtn = document.getElementById('navHomeBtn');
    const navGalleryBtn = document.getElementById('navGalleryBtn');

    const modalView = document.getElementById('modalView');
    const modalBackBtn = document.getElementById('modalBackBtn');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const searchInput = document.getElementById('searchInput');
    const searchBarContainer = document.getElementById('searchBarContainer');

    const logoBtn = document.getElementById('logoBtn');

    // Menu Drawer Links
    const menuLinkHome = document.getElementById('menuLinkHome');
    const menuLinkScoreboard = document.getElementById('menuLinkScoreboard');
    const menuLinkOffStage = document.getElementById('menuLinkOffStage');
    const menuLinkOnStage = document.getElementById('menuLinkOnStage');
    const menuLinkGallery = document.getElementById('menuLinkGallery');
    const menuLinkSchedule = document.getElementById('menuLinkSchedule');
    const menuLinkTeams = document.getElementById('menuLinkTeams');

    // Current active modal view type: 'scoreboard' | 'offstage' | 'onstage' | 'gallery' | 'schedule'
    let currentModalType = '';

    // --- Mock Database for Arts Fest 2026 ---

    const teamsData = [
        { rank: 1, name: 'ALPHA', category: 'Leader : Muhammed Insaf', points: 146, badge: 'rank-1' },
        { rank: 2, name: 'BETA', category: 'Leader : Abdhula Jazeell', points: 62, badge: 'rank-2' },
    ];



    const galleryPhotos = [
        { title: 'The Path of Knowledge 📖✨', tag: '#Ilm 🤍', image: 'https://cdn.discordapp.com/attachments/1532632973243973682/1556251832899342426/IMG-20261004-WA0046.jpg?backend=b2&ex=6ac37bf6&is=6ac22a76&hm=9be09e4c0a499ad09f2c814a2fa96d85b3b641cbd14a19dd0c649cde5ce6a6e2' },
];

    const offStagePrograms = [
        {
            id: 101,
            title: 'Writing',
            category: 'Junior',
            status: 'Uploaded',
            winners: [
                { place: '1st', name: 'Abdhul Haseeb ', chestNo: 'N', team: 'ALPHA', grade: 'A'},
                { place: '2nd', name: 'Muhammed Rani', chestNo: 'O', team: 'ALPHA', grade: 'A'},
                { place: '3rd', name: 'Muhammed Mishab', chestNo: 'x', team: 'BETA', grade: 'A'},
            ]
        },

        {
            id: 101,
            title: 'Writing',
            category: 'Senior',
            status: 'Uploaded',
            winners: [
                { place: '1st', name: 'Muhammed Shaheer ', chestNo: 'G', team: 'BETA', grade: 'A'},
                { place: '2nd', name: 'Muhammed Ashmal', chestNo: 'E', team: 'ALPHA', grade: 'A'},
                { place: '3rd', name: 'Muhammed Salim', chestNo: 'C', team: 'BETA', grade: 'A'},
            ]
        },

        {
            id: 101,
            title: 'Reading',
            category: 'Junior',
            status: 'Uploaded',
            winners: [
                { place: '1st', name: 'Swafwan Pavukkonam  ', chestNo: 'R', team: 'ALPHA', grade: 'A'},
                { place: '2nd', name: 'Abdhul Haseeb', chestNo: 'N', team: 'ALPHA', grade: 'A'},
                { place: '3rd', name: 'Muhammed Bilal', chestNo: 'P', team: 'ALPHA', grade: 'A'},
            ]
        },

        {
            id: 101,
            title: 'Qira at al-Ibarah',
            category: 'Senior',
            status: 'Uploaded',
            winners: [
                { place: '1st', name: 'Muhammed Shaheer  ', chestNo: 'G', team: 'BETA', grade: 'A'},
                { place: '2nd', name: 'Muhammed Ashaad', chestNo: 'A', team: 'ALPHA', grade: 'A'},
                { place: '3rd', name: 'Muhammed Mubassir kk', chestNo: 'F', team: 'BETA', grade: 'A'},
            ]
        },


        {
            id: 101,
            title: 'Memory Test',
            category: 'Junior',
            status: 'Uploaded',
            winners: [
                { place: '1st', name: 'Muhammed Rani  ', chestNo: 'O', team: 'ALPHA', grade: 'A'},
                { place: '2nd', name: 'Muhammed Bilal', chestNo: 'P', team: 'ALPHA', grade: 'A'},
                { place: '3rd', name: 'Abdhul Haseeb', chestNo: 'N', team: 'ALPHA', grade: 'A'},
            ]
        },

        {
            id: 101,
            title: 'Word Battle ',
            category: 'Junior',
            status: 'Uploaded',
            winners: [
                { place: '1st', name: 'Muhammed Answab  ', chestNo: 'M', team: 'ALPHA', grade: 'A'},
                { place: '2nd', name: 'Chand Babu ', chestNo: 'Y', team: 'BETA', grade: 'A'},
                { place: '3rd', name: 'Abdhul Haseeb', chestNo: 'N', team: 'ALPHA', grade: 'A'},
            ]
        },

        {
            id: 101,
            title: 'Calligrthy',
            category: 'Senior',
            status: 'Uploaded',
            winners: [
                { place: '1st', name: 'Muhammed Mubassir kk  ', chestNo: 'F', team: 'BEAT', grade: 'A'},
                { place: '2nd', name: 'Muhammed Mubashir ', chestNo: 'H', team: 'ALPHA', grade: 'A'},
                { place: '3rd', name: 'Muhammed Insaf', chestNo: 'D', team: 'ALPHA', grade: 'A'},
            ]
        },


        {
            id: 101,
            title: 'Prabandham',
            category: 'Senior',
            status: 'Uploaded',
            winners: [
                { place: '1st', name: 'Abdulla Jazeel  ', chestNo: 'B', team: 'BEAT', grade: 'A'},
                { place: '2nd', name: 'Muhammed Insaf ', chestNo: 'D', team: 'ALPHA', grade: 'A'},
                { place: '3rd', name: 'Muhammed Salim', chestNo: 'C', team: 'BEAT', grade: 'A'},
            ]
        },

         {
            id: 101,
            title: 'Prabandham',
            category: 'Junior',
            status: 'Uploaded',
            winners: [
                { place: '1st', name: 'Muhammed Ajmal  ', chestNo: 'J', team: 'BEAT', grade: 'A'},
                { place: '2nd', name: 'Muhammed Bilal ', chestNo: 'P', team: 'ALPHA', grade: 'A'},
                { place: '3rd', name: 'Muhammed Answab', chestNo: 'M', team: 'ALPHA', grade: 'A'},
            ]
        },


         {
            id: 101,
            title: 'Swaraf',
            category: 'Junior',
            status: 'Uploaded',
            winners: [
                { place: '1st', name: 'Muhammed Answab  ', chestNo: 'M', team: 'ALPHA', grade: 'A'},
                { place: '2nd', name: 'Muhammed Swafwan ', chestNo: 'R', team: 'ALPHA', grade: 'A'},
                { place: '3rd', name: 'Muhammed Sabith Aa', chestNo: 'Q', team: 'BETA', grade: 'A'},
            ]
        },
    ];
    
    const onStagePrograms = [
        {
            id: 101,
            title: 'Adhan ',
            category: 'Junior',
            status: 'Uploaded',
            winners: [
                { place: '1st', name: 'Abdul Qadar  ', chestNo: 'T', team: 'ALPHA', grade: 'A'},
                { place: '2nd', name: 'Muhammed Swabeeh ', chestNo: 'L', team: 'ALPHA', grade: 'A'},
                { place: '3rd', name: 'Muhammed Abrar', chestNo: 'V', team: 'ALPHA', grade: 'A'},
                { place: '3rd', name: 'Muhammed Musthafa', chestNo: 'U', team: 'BETA', grade: 'A'},
            ]
        },

        {
            id: 101,
            title: 'Arbic Song ',
            category: 'Senior',
            status: 'Uploaded',
            winners: [
                { place: '1st', name: 'Muhammed Ashmal', chestNo: 'E', team: 'ALPHA', grade: 'A'},
                { place: '2nd', name: 'Muhammed Mubashir', chestNo: 'H', team: 'ALPHA', grade: 'A'},
                { place: '3rd', name: 'Abdhulla Jazeel', chestNo: 'B', team: 'BETA', grade: 'A'},

            ]
        },

        {
            id: 101,
            title: 'Song ',
            category: 'Junior',
            status: 'Uploaded',
            winners: [
                { place: '1st', name: 'Muhammed Swabeeh', chestNo: 'L', team: 'ALPHA', grade: 'A'},
                { place: '2nd', name: 'Muhammed Sabith ks', chestNo: 'K', team: 'BETA', grade: 'A'},
                { place: '3rd', name: 'Muhammed Sabith AA', chestNo: 'Q', team: 'BETA', grade: 'A'},

            ]
        },

           {
            id: 101,
            title: 'Prasangam ',
            category: 'Senior',
            status: 'Uploaded',
            winners: [
                { place: '1st', name: 'Muhammed Ashhad', chestNo: 'A', team: 'ALPHA', grade: 'A'},
                { place: '2nd', name: 'Muhammed Insaf ', chestNo: 'D', team: 'ALPHA', grade: 'A'},
                { place: '3rd', name: 'Muhammed Mubashir', chestNo: 'F', team: 'BETA', grade: 'A'},

            ]
        },
             {
            id: 101,
            title: 'Prasangam ',
            category: 'Junior',
            status: 'Uploaded',
            winners: [
                { place: '1st', name: 'Muhammed Ajmal', chestNo: 'J', team: 'BETA', grade: 'A'},
                { place: '2nd', name: 'Muhammed Bilal ', chestNo: 'D', team: 'ALPHA', grade: 'A'},
                { place: '3rd', name: 'Muhammed Swafwan', chestNo: 'R', team: 'ALPHA', grade: 'A'},

            ]
        },
              {
            id: 101,
            title: 'Arbic Song ',
            category: 'Juniors',
            status: 'Uploaded',
            winners: [
                { place: '1st', name: 'Muhammed Swabeeh', chestNo: 'L', team: 'ALPHA', grade: 'A'},
                { place: '2nd', name: 'Muhammed Swafwan ', chestNo: 'R', team: 'ALPHA', grade: 'A'},
                { place: '3rd', name: 'Muhammed Mishab', chestNo: 'X', team: 'BETA', grade: 'A'},

            ]
        },

              {
            id: 101,
            title: 'Mappilappattu ',
            category: 'Senior',
            status: 'Uploaded',
            winners: [
                { place: '1st', name: 'Muhammed Ashmal', chestNo: 'E', team: 'ALPHA', grade: 'A'},
                { place: '2nd', name: 'Muhammed Ashhad ', chestNo: 'A', team: 'ALPHA', grade: 'A'},
                { place: '3rd', name: 'Muhammed Salim', chestNo: 'C', team: 'BETA', grade: 'A'},

            ]
        },

               {
            id: 101,
            title: 'Hifl ',
            category: 'Senior',
            status: 'Uploaded',
            winners: [
                { place: '1st', name: 'Muhammed Insaf', chestNo: 'D', team: 'ALPHA', grade: 'A'},
                { place: '2nd', name: 'Muhammed Siraj ', chestNo: 'I', team: 'BETA', grade: 'A'},
                { place: '3rd', name: 'Abdhulla Jazeel', chestNo: 'B', team: 'BETA', grade: 'A'},

            ]
        },

               {
            id: 101,
            title: 'Maashira ',
            category: 'Senior',
            status: 'Uploaded',
            winners: [
                { place: '1st', name: 'Muhammed Mubashir', chestNo: 'H', team: 'ALPHA', grade: 'A'},
                { place: '2nd', name: 'Muhammed Ashhad ', chestNo: 'A', team: 'ALPHA', grade: 'A'},
                { place: '3rd', name: 'Abdhulla Jazeel', chestNo: 'B', team: 'BETA', grade: 'A'},

            ]
        },

               {
            id: 101,
            title: 'Dars Class ',
            category: 'Senior',
            status: 'Uploaded',
            winners: [
                { place: '1st', name: 'Muhammed Mubashir Kk', chestNo: 'F', team: 'BETA', grade: 'A'},
                { place: '2nd', name: 'Muhammed Ashhad ', chestNo: 'A', team: 'ALPHA', grade: 'A'},
                { place: '3rd', name: 'Abdhulla Jazeel', chestNo: 'B', team: 'BETA', grade: 'A'},

            ]
        },

               {
            id: 101,
            title: 'Qira-at ',
            category: 'Junior',
            status: 'Uploaded',
            winners: [
                { place: '1st', name: 'Muhammed Swabeeh', chestNo: 'L', team: 'ALPHA', grade: 'A'},
                { place: '2nd', name: 'Abdul Qader', chestNo: 'T', team: 'ALPHA', grade: 'A'},
                { place: '3rd', name: 'Muhammed Swafwan Mt', chestNo: 'S', team: 'BETA', grade: 'A'},

            ]
        },


               {
            id: 101,
            title: 'Group song. ',
            category: 'Senior',
            status: 'Uploaded',
            winners: [
                { place: '1st', name: 'Muhammed Ashmal & Muhammed Ashhad', chestNo: 'A & E', team: 'ALPHA', grade: 'A'},
                { place: '2nd', name: 'Abdulla jazeel & Muhammed Mubashir Kk', chestNo: 'B & F', team: 'BETA', grade: 'A'},
                { place: '3rd', name: 'Muhammed Insaf & Muhammed Mubashir', chestNo: 'H & D', team: 'ALPHA', grade: 'A'},

            ]
        },

  

               {
            id: 101,
            title: 'Hifl. ',
            category: 'Junior',
            status: 'Uploaded',
            winners: [
                { place: '1st', name: 'Abdul Qader', chestNo: 'T', team: 'ALPHA', grade: 'A'},
                { place: '2nd', name: 'Muhammed Swabeeh', chestNo: 'L', team: 'ALPHA', grade: 'A'},
                { place: '3rd', name: 'Muhammed Abrar', chestNo: 'V', team: 'ALPHA', grade: 'A'},

            ]
        },




    
    ];
    
    const scheduleData = [
        { time: '07:00 AM  07:40 AM ', event: 'Dars Class (seniors)', stage: 'stage 2' },
        { time: '07:40 AM  08:30 AM', event: 'Prabandham (seniors', stage: 'stage 3' },
        { time: '07:40 AM  08:30 AM', event: 'Prabandham (juniors)', stage: 'stage 2' },
        { time: '08:30 AM  09:15 AM', event: 'Drawing (juniors)', stage: 'stage 3' },
        { time: '08:30 AM  09:15 AM', event: 'Translation (seniors)', stage: 'stage 2' },


    
    
    ];

    // --- Side Drawer Navigation Functions ---

    function openDrawer() {
        drawerOverlay.classList.add('active');
        drawerMenu.classList.add('active');
    }

    function closeDrawer() {
        drawerOverlay.classList.remove('active');
        drawerMenu.classList.remove('active');
    }

    menuToggleBtn.addEventListener('click', openDrawer);
    drawerCloseBtn.addEventListener('click', closeDrawer);
    drawerOverlay.addEventListener('click', closeDrawer);

    // --- Modal View Controller ---

    function openModal(title, type) {
        modalTitle.textContent = title;
        currentModalType = type;
        searchInput.value = '';
        searchBarContainer.style.display = (type === 'gallery' || type === 'schedule') ? 'none' : 'block';
        
        renderModalContent(type, '');
        modalView.classList.add('active');
    }

    function closeModal() {
        modalView.classList.remove('active');
        navHomeBtn.classList.add('active');
        navGalleryBtn.classList.remove('active');
    }

    modalBackBtn.addEventListener('click', closeModal);

    // --- Render Content Dynamically ---

    function renderModalContent(type, filterQuery) {
        const query = filterQuery.toLowerCase().trim();
        modalBody.innerHTML = '';

        if (type === 'scoreboard') {
            const titleEl = document.createElement('h3');
            titleEl.style.margin = '0 0 14px 0';
            titleEl.style.fontSize = '15px';
            titleEl.style.color = '#9E0012';
            titleEl.textContent = 'OVERALL GROUP LEADERBOARD 2026';
            modalBody.appendChild(titleEl);

            const filteredTeams = teamsData.filter(team => 
                team.name.toLowerCase().includes(query) || team.category.toLowerCase().includes(query)
            );

            if (filteredTeams.length === 0) {
                modalBody.innerHTML += `<p style="text-align:center; padding: 20px; color: #64748B;">No team matching "${filterQuery}"</p>`;
                return;
            }

            filteredTeams.forEach(team => {
                const card = document.createElement('div');
                card.className = 'scoreboard-card';
                card.innerHTML = `
                    <div class="team-rank ${team.badge}">${team.rank}</div>
                    <div class="team-info">
                        <div class="team-name">${team.name}</div>
                        <div class="team-category">${team.category}</div>
                    </div>
                    <div class="team-points">${team.points} pts</div>
                `;
                modalBody.appendChild(card);
            });
        } 
        else if (type === 'offstage' || type === 'onstage') {
            const list = (type === 'offstage') ? offStagePrograms : onStagePrograms;
            
            const filteredPrograms = list.filter(prog => {
                const titleMatch = prog.title.toLowerCase().includes(query);
                const catMatch = prog.category.toLowerCase().includes(query);
                const winnerMatch = prog.winners.some(w => w.name.toLowerCase().includes(query) || w.chestNo.includes(query) || w.team.toLowerCase().includes(query));
                return titleMatch || catMatch || winnerMatch;
            });

            if (filteredPrograms.length === 0) {
                modalBody.innerHTML = `<p style="text-align:center; padding: 30px; color: #64748B;">No result found matching "${filterQuery}"</p>`;
                return;
            }

            filteredPrograms.forEach(prog => {
                const itemCard = document.createElement('div');
                itemCard.className = 'program-item-card';
                
                let winnersHTML = '';
                prog.winners.forEach(w => {
                    winnersHTML += `
                        <div class="winner-card">
                            <div class="winner-place">${w.place}</div>
                            <div style="flex:1">
                                <div class="winner-name">${w.name} <span style="font-size:11px; font-weight:normal; color:#9E0012">(Code Letter #${w.chestNo})</span></div>
                                <div class="winner-sub">${w.team} • Grade: <strong>${w.grade}</strong></div>
                            </div>
                        </div>
                    `;
                });

                itemCard.innerHTML = `
                    <div class="program-title">${prog.title}</div>
                    <div class="program-meta">
                        <span>Category: ${prog.category}</span>
                        <span class="badge-status">${prog.status}</span>
                    </div>
                    <div style="margin-top: 10px;">
                        ${winnersHTML}
                    </div>
                `;
                modalBody.appendChild(itemCard);
            });
        }
        else if (type === 'gallery') {
            const container = document.createElement('div');
            container.className = 'gallery-grid';

            galleryPhotos.forEach(photo => {
                const item = document.createElement('div');
                item.className = 'gallery-item';
                item.innerHTML = `
                    <img
                         src="${photo.image}"
                         alt="${photo.title}"
                        
            style="width:100%; height:100%; object-
            fit:cover;border-radius:12px;"
                    >

                    <div class="gallery-caption">
                        <div style="font-weight:bold">${photo.title}</div>
                        <div style="opacity:0.8; font-size:10px">${photo.tag}</div>
                    </div>
                `;
                item.addEventListener('click', () => {
                    const fullScreen = document.createElement('div');
                
                    fullScreen.style.cssText = `
                        position: fixed;
                        inset: 0;
                        background: rgba(0,0,0,0.95);
                        z-index: 9999;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 20px;
                    `;
                
                    fullScreen.innerHTML = `
                        <img src="${photo.image}"
                             style="max-width:100%; max-height:90%; object-fit:contain; border-radius:12px;">
                    `;
                
                    fullScreen.addEventListener('click', () => {
                        fullScreen.remove();
                    });
                
                    document.body.appendChild(fullScreen);
                });
                container.appendChild(item);
            });
            modalBody.appendChild(container);
        }
        else if (type === 'schedule') {
            const titleEl = document.createElement('h3');
            titleEl.style.margin = '0 0 14px 0';
            titleEl.style.fontSize = '15px';
            titleEl.style.color = '#9E0012';
            titleEl.textContent = 'FEST DAY 2 PROGRAM SCHEDULE';
            modalBody.appendChild(titleEl);

            scheduleData.forEach(item => {
                const card = document.createElement('div');
                card.className = 'scoreboard-card';
                card.innerHTML = `
                    <div style="font-weight: bold; color: #9E0012; width: 80px; font-size: 12px;">${item.time}</div>
                    <div class="team-info">
                        <div class="team-name" style="font-size:14px;">${item.event}</div>
                        <div class="team-category">${item.stage}</div>
                    </div>
                `;
                modalBody.appendChild(card);
            });
        }
    }

    // --- Search Input Listener ---
    searchInput.addEventListener('input', (e) => {
        renderModalContent(currentModalType, e.target.value);
    });

    // --- Action Button Triggers ---

    scoreboardBtn.addEventListener('click', () => {
        openModal('Overall Scoreboard', 'scoreboard');
    });

    offStageBtn.addEventListener('click', () => {
        openModal('Off-Stage Results', 'offstage');
    });

    onStageBtn.addEventListener('click', () => {
        openModal('On-Stage Results', 'onstage');
    });

    logoBtn.addEventListener('click', () => {
        closeModal();
    });

    // --- Bottom Navigation Listeners ---

    navHomeBtn.addEventListener('click', () => {
        closeModal();
        navHomeBtn.classList.add('active');
        navGalleryBtn.classList.remove('active');
    });

    navGalleryBtn.addEventListener('click', () => {
        navGalleryBtn.classList.add('active');
        navHomeBtn.classList.remove('active');
        openModal('Fest Photo Gallery', 'gallery');
    });

    // --- Menu Links Click Handlers ---

    menuLinkHome.addEventListener('click', (e) => {
        e.preventDefault();
        closeDrawer();
        closeModal();
    });

    menuLinkSchedule.addEventListener('click', (e) => {
        e.preventDefault();
        closeDrawer();
        openModal('Fest Program Schedule', 'schedule');
    });


});
