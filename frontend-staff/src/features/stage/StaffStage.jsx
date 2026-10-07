import { useMemo, useState } from 'react';

const initialStaff = [
  { name: 'Nguyễn Minh Anh', email: 'minhanh@aureliahotel.com', role: 'Front desk', status: 'Active', initials: 'MA' },
  { name: 'Trần Quốc Bảo', email: 'quocbao@aureliahotel.com', role: 'Housekeeping', status: 'Active', initials: 'QB' },
  { name: 'Lê Hoàng Nam', email: 'hoangnam@aureliahotel.com', role: 'Manager', status: 'Pending', initials: 'LN' },
];

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '⌂' },
  { id: 'accounts', label: 'Quản lý tài khoản', icon: '♙' },
];

export function StaffStage({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [staff, setStaff] = useState(initialStaff);
  const [isAccountFormOpen, setAccountFormOpen] = useState(false);
  const [notice, setNotice] = useState('');
  const fullName = user?.fullName || [user?.firstName, user?.lastName].filter(Boolean).join(' ') || user?.email || 'Staff member';
  const firstName = fullName.split(' ')[0];
  const role = user?.roles?.[0]?.name || user?.roles?.[0] || 'Staff administrator';

  const stats = useMemo(() => [
    { label: 'Total reservations', value: '128', change: '+12.5%', tone: 'up', icon: '▣' },
    { label: 'Occupancy rate', value: '78%', change: '+8.2%', tone: 'up', icon: '◒' },
    { label: 'Available rooms', value: '24', change: 'of 86 rooms', tone: 'neutral', icon: '⌂' },
    { label: 'Today’s revenue', value: '$8,460', change: '+15.8%', tone: 'up', icon: '↗' },
  ], []);

  function handleCreateAccount(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = `${form.get('firstName')} ${form.get('lastName')}`.trim();
    setStaff((current) => [{ name, email: form.get('email'), role: form.get('role'), status: 'Pending', initials: name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase() }, ...current]);
    setAccountFormOpen(false);
    setNotice('Tài khoản mới đã được thêm vào danh sách demo.');
    event.currentTarget.reset();
    window.setTimeout(() => setNotice(''), 3500);
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="sidebar-brand brand brand-dark"><span className="brand-mark">A</span><span><strong>AURELIA</strong><small>STAFF PORTAL</small></span></div>
        <div className="sidebar-section-label">Workspace</div>
        <nav className="admin-nav" aria-label="Staff navigation">{navItems.map((item) => <button key={item.id} className={activeTab === item.id ? 'active' : ''} type="button" onClick={() => setActiveTab(item.id)}><span className="nav-icon">{item.icon}</span>{item.label}</button>)}</nav>
        <div className="sidebar-bottom"><div className="sidebar-help"><span>?</span><div><strong>Need help?</strong><small>Contact administrator</small></div></div><button className="sidebar-signout" type="button" onClick={onLogout}>↪ <span>Sign out</span></button></div>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar"><div className="mobile-brand brand brand-dark"><span className="brand-mark">A</span><span><strong>AURELIA</strong><small>STAFF PORTAL</small></span></div><div className="breadcrumb"><span>Staff portal</span><b>/</b><strong>{activeTab === 'dashboard' ? 'Dashboard' : 'Account management'}</strong></div><div className="topbar-actions"><button className="notification-button" type="button" aria-label="Notifications">♧<i>3</i></button><div className="topbar-profile"><span className="avatar avatar-gold">{fullName.slice(0, 2).toUpperCase()}</span><span><strong>{fullName}</strong><small>{role}</small></span><span className="chevron">⌄</span></div></div></header>
        <div className="admin-content">{notice && <div className="success-notice">✓ {notice}</div>}{activeTab === 'dashboard' ? <Dashboard firstName={firstName} stats={stats} setActiveTab={setActiveTab} /> : <Accounts staff={staff} onCreate={() => setAccountFormOpen(true)} />}</div>
      </main>
      {isAccountFormOpen && <AccountModal onClose={() => setAccountFormOpen(false)} onSubmit={handleCreateAccount} />}
    </div>
  );
}

function Dashboard({ firstName, stats, setActiveTab }) {
  return <>
    <div className="page-heading"><div><p className="eyebrow">Wednesday, October 07, 2026</p><h1>Good morning, {firstName}</h1><p>Here’s what’s happening at Aurelia Hotel today.</p></div><button className="primary-button" type="button" onClick={() => setActiveTab('accounts')}>＋ Add staff account</button></div>
    <section className="stat-grid">{stats.map((stat) => <article className="stat-card" key={stat.label}><div className="stat-icon">{stat.icon}</div><p>{stat.label}</p><strong>{stat.value}</strong><small className={`stat-change ${stat.tone}`}>{stat.tone === 'up' ? '↗' : '•'} {stat.change}</small></article>)}</section>
    <div className="dashboard-grid"><section className="panel occupancy-panel"><div className="panel-heading"><div><p className="eyebrow">Performance</p><h2>Occupancy overview</h2></div><button className="select-button" type="button">This week⌄</button></div><div className="chart-wrap"><div className="chart-y-axis"><span>100%</span><span>75%</span><span>50%</span><span>25%</span><span>0%</span></div><div className="bar-chart">{[['Mon',62],['Tue',76],['Wed',68],['Thu',84],['Fri',91],['Sat',78],['Sun',64]].map(([day, value]) => <div className="bar-column" key={day}><div className="bar-value">{value}%</div><div className="bar-track"><div className="bar-fill" style={{ height: `${value}%` }} /></div><span>{day}</span></div>)}</div></div></section><section className="panel activity-panel"><div className="panel-heading"><div><p className="eyebrow">Live updates</p><h2>Recent activity</h2></div><button className="link-button" type="button">View all</button></div><div className="activity-list"><Activity icon="✓" title="Reservation confirmed" detail="Room 304 · Sarah Wilson" time="10 min ago" tone="green" /><Activity icon="↻" title="Room service requested" detail="Room 218 · In progress" time="28 min ago" tone="gold" /><Activity icon="!" title="Maintenance reported" detail="Room 107 · Air conditioning" time="1 hr ago" tone="red" /><Activity icon="♙" title="New staff account" detail="Lê Hoàng Nam · Pending" time="2 hrs ago" tone="blue" /></div></section></div>
    <section className="panel arrivals-panel"><div className="panel-heading"><div><p className="eyebrow">Front desk</p><h2>Today’s arrivals</h2></div><button className="link-button" type="button">View reservations →</button></div><div className="arrival-table"><div className="table-row table-head"><span>Guest</span><span>Room</span><span>Check-in</span><span>Status</span></div><div className="table-row"><span className="guest-cell"><span className="avatar avatar-soft">JW</span><strong>James Wilson</strong></span><span>304</span><span>14:00</span><span className="pill confirmed">Confirmed</span></div><div className="table-row"><span className="guest-cell"><span className="avatar avatar-lilac">EM</span><strong>Emma Martin</strong></span><span>218</span><span>15:30</span><span className="pill pending">Pending</span></div></div></section>
  </>;
}

function Activity({ icon, title, detail, time, tone }) { return <div className="activity-item"><span className={`activity-icon ${tone}`}>{icon}</span><div><strong>{title}</strong><small>{detail}</small></div><time>{time}</time></div>; }

function Accounts({ staff, onCreate }) {
  return <><div className="page-heading accounts-heading"><div><p className="eyebrow">People & access</p><h1>Quản lý tài khoản</h1><p>Quản lý thông tin và quyền truy cập của đội ngũ nhân viên.</p></div><button className="primary-button" type="button" onClick={onCreate}>＋ Tạo tài khoản</button></div><section className="panel accounts-panel"><div className="accounts-toolbar"><div className="search-box">⌕<input placeholder="Tìm kiếm nhân viên..." aria-label="Search staff" /></div><button className="filter-button" type="button">Tất cả trạng thái⌄</button></div><div className="account-table"><div className="account-row account-head"><span>Nhân viên</span><span>Vai trò</span><span>Trạng thái</span><span>Thao tác</span></div>{staff.map((member) => <div className="account-row" key={member.email}><span className="guest-cell"><span className="avatar avatar-gold">{member.initials}</span><span><strong>{member.name}</strong><small>{member.email}</small></span></span><span>{member.role}</span><span><span className={`pill ${member.status === 'Active' ? 'confirmed' : 'pending'}`}>{member.status === 'Active' ? 'Đang hoạt động' : 'Chờ kích hoạt'}</span></span><span><button className="row-action" type="button">•••</button></span></div>)}</div><p className="table-foot">Hiển thị {staff.length} tài khoản nhân viên · Các chức năng phân quyền nâng cao sẽ được bổ sung sau.</p></section></>;
}

function AccountModal({ onClose, onSubmit }) { return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><div className="account-modal" role="dialog" aria-modal="true" aria-labelledby="account-modal-title"><div className="modal-heading"><div><p className="eyebrow">Staff portal</p><h2 id="account-modal-title">Tạo tài khoản mới</h2><p>Nhập thông tin cá nhân của nhân viên.</p></div><button className="close-button" type="button" onClick={onClose} aria-label="Close">×</button></div><form className="account-form" onSubmit={onSubmit}><div className="form-row"><label>Họ<input name="firstName" placeholder="Nguyễn" required /></label><label>Tên<input name="lastName" placeholder="Minh Anh" required /></label></div><label>Email công việc<input name="email" type="email" placeholder="nhanvien@aureliahotel.com" required /></label><div className="form-row"><label>Số điện thoại<input name="phone" placeholder="09xx xxx xxx" /></label><label>Vai trò<select name="role" defaultValue="Front desk"><option>Front desk</option><option>Housekeeping</option><option>Manager</option></select></label></div><div className="form-actions"><button className="secondary-button" type="button" onClick={onClose}>Hủy</button><button className="primary-button" type="submit">Tạo tài khoản</button></div></form></div></div>; }
