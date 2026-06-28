// Default initial credentials list
const defaultCredentials = [
    { game: "Demo Game - Steam", account: "demo_user", password: "SuperSecurePassword123", email: "demo@example.com", emailPass: "DemoEmailPass!", extra: "Steam ID: 76561197960287930", tags: ["steam"] },
    { game: "Demo Adventure - Epic Games", account: "epic_adventurer", password: "AdventurePassword987", email: "adventure@example.com", emailPass: "AdventureEmailPass!", extra: "Epic ID: 4d8b8a92", tags: ["epic"] }
];

const STORAGE_KEY = 'gimo_credentials_vault_v2';
let credentials = [];

// Load data from LocalStorage with defaults fallback
try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        credentials = JSON.parse(stored);
    } else {
        credentials = [...defaultCredentials];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(credentials));
    }
} catch (e) {
    console.error('Failed to load from local storage', e);
    credentials = [...defaultCredentials];
}

// Save data to LocalStorage
function saveToStorage() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(credentials));
    } catch (e) {
        console.error('Failed to save to local storage', e);
    }
}

// Global states
let revealedFields = {};
let editingIndex = null;
let selectedTags = [];

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Toggle Platform Tag Select State in Form
function toggleTagSelection(tag) {
    const index = selectedTags.indexOf(tag);
    if (index > -1) {
        selectedTags.splice(index, 1);
    } else {
        selectedTags.push(tag);
    }
    updateTagSelectorUI();
}

function updateTagSelectorUI() {
    document.querySelectorAll('.tag-select-btn').forEach(btn => {
        const tag = btn.getAttribute('data-tag');
        if (selectedTags.includes(tag)) {
            btn.classList.add('selected');
        } else {
            btn.classList.remove('selected');
        }
    });
}

// Get Tag Badge HTML for Card Display
function getTagBadgeHTML(tag) {
    const tagMap = {
        steam: {
            label: 'Steam',
            bg: '#171A21',
            color: '#FFFFFF',
            svg: `<svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor"><path d="M.329 10.333A8.01 8.01 0 0 0 7.99 16C12.414 16 16 12.418 16 8s-3.586-8-8.009-8A8.006 8.006 0 0 0 0 7.468l.003.006 4.304 1.769A2.2 2.2 0 0 1 5.62 8.88l1.96-2.844-.001-.04a3.046 3.046 0 0 1 3.042-3.043 3.046 3.046 0 0 1 3.042 3.043 3.047 3.047 0 0 1-3.111 3.044l-2.804 2a2.223 2.223 0 0 1-3.075 2.11 2.22 2.22 0 0 1-1.312-1.568L.33 10.333Z"/><path d="M4.868 12.683a1.715 1.715 0 0 0 1.318-3.165 1.7 1.7 0 0 0-1.263-.02l1.023.424a1.261 1.261 0 1 1-.97 2.33l-.99-.41a1.7 1.7 0 0 0 .882.84Zm3.726-6.687a2.03 2.03 0 0 0 2.027 2.029 2.03 2.03 0 0 0 2.027-2.029 2.03 2.03 0 0 0-2.027-2.027 2.03 2.03 0 0 0-2.027 2.027m2.03-1.527a1.524 1.524 0 1 1-.002 3.048 1.524 1.524 0 0 1 .002-3.048"/></svg>`
        },
        epic: {
            label: 'Epic Games',
            bg: '#313131',
            color: '#FFFFFF',
            svg: `<svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M3.537 0C2.165 0 1.66.506 1.66 1.879V18.44a4.262 4.262 0 00.02.433c.031.3.037.59.316.92.027.033.311.245.311.245.153.075.258.13.43.2l8.335 3.491c.433.199.614.276.928.27h.002c.314.006.495-.071.928-.27l8.335-3.492c.172-.07.277-.124.43-.2 0 0 .284-.211.311-.243.28-.33.285-.621.316-.92a4.261 4.261 0 00.02-.434V1.879c0-1.373-.506-1.88-1.878-1.88zm13.366 3.11h.68c1.138 0 1.688.553 1.688 1.696v1.88h-1.374v-1.8c0-.369-.17-.54-.523-.54h-.235c-.367 0-.537.17-.537.539v5.81c0 .369.17.54.537.54h.262c.353 0 .523-.171.523-.54V8.619h1.373v2.143c0 1.144-.562 1.71-1.7 1.71h-.694c-1.138 0-1.7-.566-1.7-1.71V4.82c0-1.144.562-1.709 1.7-1.709zm-12.186.08h3.114v1.274H6.117v2.603h1.648v1.275H6.117v2.774h1.74v1.275h-3.14zm3.816 0h2.198c1.138 0 1.7.564 1.7 1.708v2.445c0 1.144-.562 1.71-1.7 1.71h-.799v3.338h-1.4zm4.53 0h1.4v9.201h-1.4zm-3.13 1.235v3.392h.575c.354 0 .523-.171.523-.54V4.965c0-.368-.17-.54-.523-.54zm-3.74 10.147a1.708 1.708 0 01.591.108 1.745 1.745 0 01.49.299l-.452.546a1.247 1.247 0 00-.308-.195.91.91 0 00-.363-.068.658.658 0 00-.28.06.703.703 0 00-.224.163.783.783 0 00-.151.243.799.799 0 00-.056.299v.008a.852.852 0 00.056.31.7.7 0 00.157.245.736.736 0 00.238.16.774.774 0 00.303.058.79.79 0 00.445-.116v-.339h-.548v-.565H7.37v1.255a2.019 2.019 0 01-.524.307 1.789 1.789 0 01-.683.123 1.642 1.642 0 01-.602-.107 1.46 1.46 0 01-.478-.3 1.371 1.371 0 01-.318-.455 1.438 1.438 0 01-.115-.58v-.008a1.426 1.426 0 01.113-.57 1.449 1.449 0 01.312-.46 1.418 1.418 0 01.474-.309 1.58 1.58 0 01.598-.111 1.708 1.708 0 01.045 0zm11.963.008a2.006 2.006 0 01.612.094 1.61 1.61 0 01.507.277l-.386.546a1.562 1.562 0 00-.39-.205 1.178 1.178 0 00-.388-.07.347.347 0 00-.208.052.154.154 0 00-.07.127v.008a.158.158 0 00.022.084.198.198 0 00.076.066.831.831 0 00.147.06.062.02.14.04.236.061a3.389 3.389 0 01.43.122 1.292 1.292 0 01.328.17.678.678 0 01.207.24.739.739 0 01.071.337v.008a.865.865 0 01-.081.382.82.82 0 01-.229.285 1.032 1.032 0 01-.353.18 1.606 1.606 0 01-.46.061 2.16 2.16 0 01-.71-.116 1.718 1.718 0 01-.593-.346l.43-.514c.277.223.578.335.9.335a.457.457 0 00.236-.05.157.157 0 00.082-.142v-.008a.15.15 0 00-.02-.077.204.204 0 00-.073-.066.753.753 0 00-.143-.062 2.45 2.45 0 00-.233-.062 5.036 5.036 0 01-.413-.113 1.26 1.26 0 01-.331-.16.72.72 0 01-.222-.243.73.73 0 01-.082-.36v-.008a.863.863 0 01.074-.359.794.794 0 01.214-.283 1.007 1.007 0 01.34-.185 1.423 1.423 0 01.448-.066 2.006 2.006 0 01.025 0zm-9.358.025h.742l1.183 2.81h-.825l-.203-.499H8.623l-.198.498h-.81zm2.197.02h.814l.663 1.08.663-1.08h.814v2.79h-.766v-1.602l-.711 1.091h-.016l-.707-1.083v1.593h-.754zm3.469 0h2.235v.658h-1.473v.422h1.334v.61h-1.334v.442h1.493v.658h-2.255zm-5.3.897l-.315.793h.624zm-1.145 5.19h8.014l-4.09 1.348z"/></svg>`
        },
        ubisoft: {
            label: 'Ubisoft',
            bg: '#4B5563',
            color: '#FFFFFF',
            svg: `<svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M23.561 11.988C23.301-.304 6.954-4.89.656 6.634c.282.206.661.477.943.672a11.747 11.747 0 00-.976 3.067 11.885 11.885 0 00-.184 2.071C.439 18.818 5.621 24 12.005 24c6.385 0 11.556-5.17 11.556-11.556v-.455zm-20.27 2.06c-.152 1.246-.054 1.636-.054 1.788l-.282.098c-.108-.206-.37-.932-.488-1.908C2.163 10.308 4.7 6.96 8.57 6.33c3.544-.52 6.937 1.68 7.728 4.758l-.282.098c-.087-.087-.228-.336-.77-.878-4.281-4.281-11.002-2.32-11.956 3.74zm11.002 2.081a3.145 3.145 0 01-2.59 1.355 3.15 3.15 0 01-3.155-3.155 3.159 3.159 0 012.927-3.144c1.018-.043 1.972.51 2.416 1.398a2.58 2.58 0 01-.455 2.95c.293.205.575.4.856.595zm6.58.12c-1.669 3.782-5.106 5.766-8.77 5.712-7.034-.347-9.083-8.466-4.38-11.393l.207.206c-.076.108-.358.325-.791 1.182-.51 1.041-.672 2.081-.607 2.732.369 5.67 8.314 6.83 11.045 1.214C21.057 8.217 11.822.401 3.626 6.374l-.184-.184C5.599 2.808 9.816 1.3 13.837 2.309c6.147 1.55 9.453 7.956 7.035 13.94z"/></svg>`
        },
        xbox: {
            label: 'Xbox',
            bg: '#107C10',
            color: '#FFFFFF',
            svg: `<svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor"><path d="M7.202 15.967a8 8 0 0 1-3.552-1.26c-.898-.585-1.101-.826-1.101-1.306 0-.965 1.062-2.656 2.879-4.583C6.459 7.723 7.897 6.44 8.052 6.475c.302.068 2.718 2.423 3.622 3.531 1.43 1.753 2.088 3.189 1.754 3.829-.254.486-1.83 1.437-2.987 1.802-.954.301-2.207.429-3.239.33m-5.866-3.57C.589 11.253.212 10.127.03 8.497c-.06-.539-.038-.846.137-1.95.218-1.377 1.002-2.97 1.945-3.95.401-.417.437-.427.926-.263.595.2 1.23.638 2.213 1.528l.574.519-.313.385C4.056 6.553 2.52 9.086 1.94 10.653c-.315.852-.442 1.707-.306 2.063.091.24.007.15-.3-.319Zm13.101.195c.074-.36-.019-1.02-.238-1.687-.473-1.443-2.055-4.128-3.508-5.953l-.457-.575.494-.454c.646-.593 1.095-.948 1.58-1.25.381-.237.927-.448 1.161-.448.145 0 .654.528 1.065 1.104a8.4 8.4 0 0 1 1.343 3.102c.153.728.166 2.286.024 3.012a9.5 9.5 0 0 1-.6 1.893c-.179.393-.624 1.156-.82 1.404-.1.128-.1.127-.043-.148ZM7.335 1.952c-.67-.34-1.704-.705-2.276-.803a4 4 0 0 0-.759-.043c-.471.024-.45 0 .306-.358A7.8 7.8 0 0 1 6.47.128c.8-.169 2.306-.17 3.094-.005.85.18 1.853.552 2.418.9l.168.103-.385-.02c-.766-.038-1.88.27-3.078.853-.361.176-.676.316-.699.312a12 12 0 0 1-.654-.319Z"/></svg>`
        },
        rockstar: {
            label: 'Rockstar',
            bg: '#FFB300',
            color: '#000000',
            svg: `<svg viewBox="6.525 7.459 339.266 319.582" width="12" height="12"><path fill="#FFB300" d="M71.598 11.25H280.72c33.844 0 61.282 25.782 61.282 57.586v196.512c0 31.804-27.437 57.586-61.282 57.586H71.598c-33.845 0-61.28-25.782-61.28-57.586V68.836c0-31.804 27.435-57.586 61.28-57.586z"></path><path fill="#000000" d="M280.719 326.725H71.598c-35.881 0-65.072-27.533-65.072-61.377V68.836c0-33.844 29.19-61.377 65.072-61.377H280.72c35.88 0 65.072 27.533 65.072 61.377v196.512c0 33.844-29.192 61.377-65.073 61.377zM71.598 15.042c-31.7 0-57.49 24.131-57.49 53.794v196.512c0 29.662 25.79 53.794 57.49 53.794H280.72c31.7 0 57.49-24.132 57.49-53.794V68.836c0-29.662-25.79-53.794-57.49-53.794H71.598z"></path><path fill="#000000" d="M127.423 64.013l62.975.149c13.161-.099 22.989 2.002 29.48 6.303 7.928 5.272 11.89 14.343 11.89 27.213 0 21.19-9.828 33.195-29.482 36.012v.297c8.667 2.159 13.048 9.335 13.146 21.528 0 6.245-.233 14.245-.7 24 0 6.542 1.384 12.202 4.156 16.98H184.38c-1.38 0-2.566 2.594c-.617 1.126-.926 2.297-.926 3.514 0 1.211.304 2.372.91 3.482a6.542 6.542 0 0 0 2.542 2.596c1.089.619 2.224.93 3.409.93 1.183 0 2.32-.311 3.41-.93a6.498 6.498 0 0 0 2.536-2.596c.603-1.11.904-2.27.904-3.482 0-1.218-.308-2.388-.92-3.514a6.39 6.39 0 0 0-2.565-2.594c-1.094-.606-2.216-.909-3.364-.909zm-3.604 11.664v-9.045h3.038c1.039 0 1.79.083 2.254.25.466.167.835.459 1.11.875.277.416.415.857.415 1.325 0 .661-.23 1.237-.692 1.726-.46.49-1.072.764-1.835.824.312.135.563.294.75.48.358.356.792.954 1.308 1.792l1.078 1.772h-1.742l-.783-1.426c-.617-1.12-1.115-1.823-1.492-2.105-.262-.209-.643-.313-1.145-.313h-.838v3.844h-1.426zm1.426-5.092h1.732c.829 0 1.393-.126 1.694-.38.3-.25.451-.586.451-1.002a1.24 1.24 0 0 0-.218-.718 1.302 1.302 0 0 0-.604-.473c-.258-.103-.734-.157-1.431-.157h-1.624v2.73z"></path><path fill="#FFFFFF" d="M252.503 221.088l25.47-18.142h-28.177l-4.881-31.464-17.882 31.168h-28.467l17.302 18.587-14.305 31.193 31.052-18.735 24.48 19.18-4.592-31.787z"></path></svg>`
        }
    };
    const config = tagMap[tag];
    if (!config) return '';
    return `<span class="tag-badge" style="background-color: ${config.bg}; color: ${config.color};">${config.svg}<span>${config.label}</span></span>`;
}

// Toggle Password/Email Password Masking
function toggleFieldVisibility(fieldKey) {
    revealedFields[fieldKey] = !revealedFields[fieldKey];
    render(document.getElementById('searchInput').value);
}

// Create Card HTML structure with edit/delete buttons, eye toggles, and platform badges
function createCard(cred, index) {
    const isPassRevealed = !!revealedFields[`p-${index}`];
    const isEmailPassRevealed = !!revealedFields[`ep-${index}`];

    const displayPass = isPassRevealed ? cred.password : '••••••••';
    const displayEmailPass = isEmailPassRevealed ? cred.emailPass : '••••••••';

    return `
        <div class="card">
            <div class="card-header">
                <div class="card-title">${escapeHtml(cred.game)}</div>
                <div class="card-header-actions">
                    <button class="card-action-btn edit-btn" onclick="openModal(${index})" title="Edit Game">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="15" height="15">
                            <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
                        </svg>
                    </button>
                    <button class="card-action-btn delete-btn" onclick="deleteCredential(${index})" title="Delete Game">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="15" height="15">
                            <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2M10 11v6M14 11v6"></path>
                        </svg>
                    </button>
                </div>
            </div>

            ${cred.tags && cred.tags.length > 0 ? `
            <div class="card-tags-wrapper">
                ${cred.tags.map(getTagBadgeHTML).join('')}
            </div>
            ` : ''}

            ${cred.account ? `
            <div class="credential-field">
                <div class="field-label">Account/ID</div>
                <div class="field-value-wrapper">
                    <div class="field-value">${escapeHtml(cred.account)}</div>
                    <button class="btn btn-copy" onclick="copyText('${escapeHtml(cred.account).replace(/'/g, "\\'")}', this)" title="Copy Account ID">Copy</button>
                </div>
            </div>
            ` : ''}

            ${cred.password ? `
            <div class="credential-field">
                <div class="field-label">Password</div>
                <div class="field-value-wrapper">
                    <div class="field-value password-field">${escapeHtml(displayPass)}</div>
                    <button class="card-action-btn toggle-visibility-btn" onclick="toggleFieldVisibility('p-${index}')" title="${isPassRevealed ? 'Hide' : 'Show'} Password">
                        ${isPassRevealed ? `
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="16" height="16">
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22"></path>
                        </svg>
                        ` : `
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="16" height="16">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                        `}
                    </button>
                    <button class="btn btn-copy" onclick="copyText('${escapeHtml(cred.password).replace(/'/g, "\\'")}', this)" title="Copy Password">Copy</button>
                </div>
            </div>
            ` : ''}

            ${cred.email ? `
            <div class="credential-field">
                <div class="field-label">Email</div>
                <div class="field-value-wrapper">
                    <div class="field-value">${escapeHtml(cred.email)}</div>
                    <button class="btn btn-copy" onclick="copyText('${escapeHtml(cred.email).replace(/'/g, "\\'")}', this)" title="Copy Email">Copy</button>
                </div>
            </div>
            ` : ''}

            ${cred.emailPass ? `
            <div class="credential-field">
                <div class="field-label">Email Password</div>
                <div class="field-value-wrapper">
                    <div class="field-value password-field">${escapeHtml(displayEmailPass)}</div>
                    <button class="card-action-btn toggle-visibility-btn" onclick="toggleFieldVisibility('ep-${index}')" title="${isEmailPassRevealed ? 'Hide' : 'Show'} Email Password">
                        ${isEmailPassRevealed ? `
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="16" height="16">
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22"></path>
                        </svg>
                        ` : `
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="16" height="16">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                        `}
                    </button>
                    <button class="btn btn-copy" onclick="copyText('${escapeHtml(cred.emailPass).replace(/'/g, "\\'")}', this)" title="Copy Email Password">Copy</button>
                </div>
            </div>
            ` : ''}

            ${cred.extra ? `
            <div class="credential-field">
                <div class="field-label">Extra Info</div>
                <div class="field-value-wrapper">
                    <div class="field-value">${escapeHtml(cred.extra)}</div>
                    <button class="btn btn-copy" onclick="copyText('${escapeHtml(cred.extra).replace(/'/g, "\\'")}', this)" title="Copy Extra Info">Copy</button>
                </div>
            </div>
            ` : ''}
        </div>
    `;
}

// Copy Text Functionality
function copyText(text, btn) {
    navigator.clipboard.writeText(text).then(() => {
        const original = btn.textContent;
        btn.textContent = 'Copied!';
        btn.classList.add('copied');

        setTimeout(() => {
            btn.textContent = original;
            btn.classList.remove('copied');
        }, 1500);

        showToast('✓ Copied to clipboard!');
    }).catch(err => {
        console.error('Copy failed', err);
        showToast('❌ Copy failed');
    });
}

// Toast Messages
function showToast(msg) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    document.body.appendChild(toast);

    setTimeout(() => toast.remove(), 2500);
}

// Render List
function render(filter = '') {
    const grid = document.getElementById('credentialsGrid');
    const empty = document.getElementById('emptyState');
    const countBadge = document.getElementById('credentialsCount');

    const filtered = credentials.filter(c => {
        const search = filter.toLowerCase();
        const hasTagMatch = c.tags && c.tags.some(t => t.toLowerCase().includes(search));
        return c.game.toLowerCase().includes(search) ||
               (c.account && c.account.toLowerCase().includes(search)) ||
               (c.email && c.email.toLowerCase().includes(search)) ||
               hasTagMatch;
    });

    countBadge.textContent = filtered.length;

    if (filtered.length === 0) {
        grid.innerHTML = '';
        empty.style.display = 'block';
    } else {
        // Render card using mapping, mapping the element back to its absolute credentials index
        grid.innerHTML = filtered.map(c => createCard(c, credentials.indexOf(c))).join('');
        empty.style.display = 'none';
    }
}

// Modal Open
function openModal(index = null) {
    editingIndex = index;
    const modal = document.getElementById('modal');
    const title = document.getElementById('modalTitle');
    const subtitle = document.getElementById('modalSubtitle');
    const submitBtn = document.getElementById('submitBtn');

    if (index !== null) {
        // Edit existing credential
        const cred = credentials[index];
        title.textContent = 'Edit Game';
        subtitle.textContent = 'Update your gaming credential entry';
        submitBtn.textContent = 'Save Changes';

        document.getElementById('gameName').value = cred.game;
        document.getElementById('gameAccount').value = cred.account || '';
        document.getElementById('gamePassword').value = cred.password || '';
        document.getElementById('gameEmail').value = cred.email || '';
        document.getElementById('gameEmailPass').value = cred.emailPass || '';
        document.getElementById('gameExtra').value = cred.extra || '';
        selectedTags = [...(cred.tags || [])];
    } else {
        // Add new credential
        title.textContent = 'Add New Game';
        subtitle.textContent = 'Create a new gaming credential entry';
        submitBtn.textContent = 'Add';

        document.getElementById('gameName').value = '';
        document.getElementById('gameAccount').value = '';
        document.getElementById('gamePassword').value = '';
        document.getElementById('gameEmail').value = '';
        document.getElementById('gameEmailPass').value = '';
        document.getElementById('gameExtra').value = '';
        selectedTags = [];
    }

    updateTagSelectorUI();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling

    // Focus first input field automatically
    setTimeout(() => {
        document.getElementById('gameName').focus();
    }, 100);
}

// Modal Close
function closeModal() {
    document.getElementById('modal').classList.remove('active');
    document.body.style.overflow = ''; // Restore background scrolling
    editingIndex = null;
    selectedTags = [];
}

// Save Credential (Add / Edit)
function addCredential() {
    const name = document.getElementById('gameName').value.trim();
    if (!name) {
        showToast('Please enter a game name');
        return;
    }

    const credData = {
        game: name,
        account: document.getElementById('gameAccount').value.trim(),
        password: document.getElementById('gamePassword').value.trim(),
        email: document.getElementById('gameEmail').value.trim(),
        emailPass: document.getElementById('gameEmailPass').value.trim(),
        extra: document.getElementById('gameExtra').value.trim(),
        tags: [...selectedTags]
    };

    if (editingIndex !== null) {
        credentials[editingIndex] = credData;
        showToast('✓ Credential updated!');
    } else {
        credentials.unshift(credData);
        showToast('✓ Credential added!');
    }

    saveToStorage();
    closeModal();
    render(document.getElementById('searchInput').value);
}

// Delete Credential
function deleteCredential(index) {
    const name = credentials[index].game;
    if (confirm(`Are you sure you want to delete credentials for "${name}"?`)) {
        credentials.splice(index, 1);
        saveToStorage();
        showToast(`✓ Deleted ${name}`);
        render(document.getElementById('searchInput').value);
    }
}

// Search Bar Functionality
const searchInput = document.getElementById('searchInput');
const clearSearchBtn = document.getElementById('clearSearchBtn');

searchInput.addEventListener('input', (e) => {
    const val = e.target.value;
    clearSearchBtn.style.display = val ? 'flex' : 'none';
    render(val);
});

// ESC Key Clear Search
function clearSearch() {
    searchInput.value = '';
    clearSearchBtn.style.display = 'none';
    render('');
    searchInput.focus();
}

// Modal Background Click Close
document.getElementById('modal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('modal')) closeModal();
});

// ESC Key Close Modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

// ========== THEME AND TRANSITIONS SCRIPTS ==========
const toggleButton = document.getElementById('themeSwitcher');
const html = document.documentElement;

function toggleTheme() {
    html.classList.toggle('dark');
    localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
}

toggleButton.addEventListener('click', () => {
    // Fallback if view transition API is not supported
    if (!document.startViewTransition) {
        toggleTheme();
        return;
    }
    document.startViewTransition(toggleTheme);
});

// Initialize Rendering
render();
