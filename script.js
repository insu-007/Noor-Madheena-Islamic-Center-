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
        { rank: 1, name: 'BADR WARRIORS', category: 'General Category', points: 342, badge: 'rank-1' },
        { rank: 2, name: 'NOOR FALCONS', category: 'General Category', points: 315, badge: 'rank-2' },
        { rank: 3, name: 'MINAR KNIGHTS', category: 'General Category', points: 298, badge: 'rank-3' },
        { rank: 4, name: 'AL HUDA STRIKERS', category: 'General Category', points: 265, badge: 'rank-other' }
    ];

    const offStagePrograms = [
        {
            id: 101,
            title: 'Calligraphy (Arabic)',
            category: 'Senior',
            status: 'Published',
            winners: [
                { place: '1st', name: 'Muhammed Sinan', chestNo: '104', team: 'Badr Warriors', grade: 'A' },
                { place: '2nd', name: 'Ameen Farhan', chestNo: '208', team: 'Noor Falcons', grade: 'A' },
                { place: '3rd', name: 'Rashid Ahmed', chestNo: '312', team: 'Minar Knights', grade: 'B' }
            ]
        },
        {
            id: 102,
            title: 'Pencil Drawing',
            category: 'Junior',
            status: 'Published',
            winners: [
                { place: '1st', name: 'Zayan Ali', chestNo: '115', team: 'Noor Falcons', grade: 'A' },
                { place: '2nd', name: 'Bilal Hussain', chestNo: '221', team: 'Badr Warriors', grade: 'A' },
                { place: '3rd', name: 'Fadil K.V.', chestNo: '304', team: 'Al Huda Strikers', grade: 'A' }
            ]
        },
        {
            id: 103,
            title: 'Essay Writing (English)',
            category: 'General',
            status: 'Published',
            winners: [
                { place: '1st', name: 'Ibrahim Khalil', chestNo: '102', team: 'Minar Knights', grade: 'A' },
                { place: '2nd', name: 'Suhail Tariq', chestNo: '189', team: 'Badr Warriors', grade: 'A' },
                { place: '3rd', name: 'Nabil Mansoor', chestNo: '254', team: 'Noor Falcons', grade: 'B' }
            ]
        },
        {
            id: 104,
            title: 'Water Color Painting',
            category: 'Sub-Junior',
            status: 'Published',
            winners: [
                { place: '1st', name: 'Rayan Muhammed', chestNo: '142', team: 'Badr Warriors', grade: 'A' },
                { place: '2nd', name: 'Nafih Abdullah', chestNo: '111', team: 'Al Huda Strikers', grade: 'A' },
                { place: '3rd', name: 'Adil Shareef', chestNo: '203', team: 'Minar Knights', grade: 'B' }
            ]
        },
        {
            id: 105,
            title: 'Quiz Competition',
            category: 'Senior',
            status: 'Published',
            winners: [
                { place: '1st', name: 'Team Badr', chestNo: '101', team: 'Badr Warriors', grade: 'A' },
                { place: '2nd', name: 'Team Noor', chestNo: '202', team: 'Noor Falcons', grade: 'A' },
                { place: '3rd', name: 'Team Minar', chestNo: '303', team: 'Minar Knights', grade: 'A' }
            ]
        }
    ];

    const onStagePrograms = [
        {
            id: 201,
            title: 'Qira\'at (Quran Recitation)',
            category: 'Senior',
            status: 'Published',
            winners: [
                { place: '1st', name: 'Hafiz Swalih', chestNo: '108', team: 'Noor Falcons', grade: 'A' },
                { place: '2nd', name: 'Muhammed Rizwan', chestNo: '215', team: 'Badr Warriors', grade: 'A' },
                { place: '3rd', name: 'Abdullah Omar', chestNo: '309', team: 'Minar Knights', grade: 'A' }
            ]
        },
        {
            id: 202,
            title: 'Duffmuttu Performance',
            category: 'General',
            status: 'Published',
            winners: [
                { place: '1st', name: 'Badr Duff Team', chestNo: '501', team: 'Badr Warriors', grade: 'A' },
                { place: '2nd', name: 'Noor Duff Team', chestNo: '502', team: 'Noor Falcons', grade: 'A' },
                { place: '3rd', name: 'Al Huda Duff Group', chestNo: '504', team: 'Al Huda Strikers', grade: 'B' }
            ]
        },
        {
            id: 203,
            title: 'Malayalam Speech',
            category: 'Junior',
            status: 'Published',
            winners: [
                { place: '1st', name: 'Afnan Majeed', chestNo: '119', team: 'Badr Warriors', grade: 'A' },
                { place: '2nd', name: 'Danish Faraz', chestNo: '228', team: 'Minar Knights', grade: 'A' },
                { place: '3rd', name: 'Yaseen Ahmed', chestNo: '150', team: 'Noor Falcons', grade: 'B' }
            ]
        },
        {
            id: 204,
            title: 'Mappilapattu (Solo)',
            category: 'Senior',
            status: 'Published',
            winners: [
                { place: '1st', name: 'Shammas K.', chestNo: '133', team: 'Minar Knights', grade: 'A' },
                { place: '2nd', name: 'Basith Hassan', chestNo: '210', team: 'Badr Warriors', grade: 'A' },
                { place: '3rd', name: 'Faris Rahiman', chestNo: '177', team: 'Noor Falcons', grade: 'A' }
            ]
        },
        {
            id: 205,
            title: 'Group Song (Meelad Chorus)',
            category: 'General',
            status: 'Published',
            winners: [
                { place: '1st', name: 'Noor Choir', chestNo: '601', team: 'Noor Falcons', grade: 'A' },
                { place: '2nd', name: 'Badr Ensemble', chestNo: '602', team: 'Badr Warriors', grade: 'A' },
                { place: '3rd', name: 'Minar Voices', chestNo: '603', team: 'Minar Knights', grade: 'A' }
            ]
        }
    ];

    const galleryPhotos = [
        { title: 'Inauguration Ceremony 2026', tag: 'Stage 1', bg: 'linear-gradient(135deg, #9E0012, #E8A217)' },
        { title: 'Duffmuttu Grand Final', tag: 'Stage 1', bg: 'linear-gradient(135deg, #1E293B, #9E0012)' },
        { title: 'Calligraphy Competition', tag: 'Hall B', bg: 'linear-gradient(135deg, #059669, #10B981)' },
        { title: 'Qira\'at Winners Awarding', tag: 'Stage 2', bg: 'linear-gradient(135deg, #D97706, #B45309)' },
        { title: 'Group Song Champions', tag: 'Stage 1', bg: 'linear-gradient(135deg, #2563EB, #1E40AF)' },
        { title: 'Score Board Celebration', tag: 'Main Arena', bg: 'linear-gradient(135deg, #9E0012, #7A000D)' }
    ];

    const scheduleData = [
        { time: '09:00 AM', event: 'Qira\'at Competition', stage: 'Stage 1 (Main Hall)' },
        { time: '10:30 AM', event: 'Calligraphy & Pencil Drawing', stage: 'Off-Stage Hall A' },
        { time: '01:30 PM', event: 'Malayalam & English Speech', stage: 'Stage 2' },
        { time: '03:30 PM', event: 'Duffmuttu & Group Song', stage: 'Stage 1 (Main Hall)' },
        { time: '07:00 PM', event: 'Grand Valedictory & Trophy Awarding', stage: 'Main Arena' }
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
                                <div class="winner-name">${w.name} <span style="font-size:11px; font-weight:normal; color:#9E0012">(Chest #${w.chestNo})</span></div>
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
                item.style.background = photo.bg;
                item.innerHTML = `
                    <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; color:white; font-size:32px;">
                        🖼️
                    </div>
                    <div class="gallery-caption">
                        <div style="font-weight:bold">${photo.title}</div>
                        <div style="opacity:0.8; font-size:10px">${photo.tag}</div>
                    </div>
                `;
                item.addEventListener('click', () => {
                    alert(`Opening photo: ${photo.title}`);
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
            titleEl.textContent = 'FEST DAY PROGRAM SCHEDULE';
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

    menuLinkScoreboard.addEventListener('click', (e) => {
        e.preventDefault();
        closeDrawer();
        openModal('Overall Scoreboard', 'scoreboard');
    });

    menuLinkOffStage.addEventListener('click', (e) => {
        e.preventDefault();
        closeDrawer();
        openModal('Off-Stage Results', 'offstage');
    });

    menuLinkOnStage.addEventListener('click', (e) => {
        e.preventDefault();
        closeDrawer();
        openModal('On-Stage Results', 'onstage');
    });

    menuLinkGallery.addEventListener('click', (e) => {
        e.preventDefault();
        closeDrawer();
        openModal('Fest Photo Gallery', 'gallery');
    });

    menuLinkSchedule.addEventListener('click', (e) => {
        e.preventDefault();
        closeDrawer();
        openModal('Fest Program Schedule', 'schedule');
    });

    menuLinkTeams.addEventListener('click', (e) => {
        e.preventDefault();
        closeDrawer();
        openModal('Group Standings', 'scoreboard');
    });

});
