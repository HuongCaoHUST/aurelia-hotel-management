
import { useState } from 'react'
import './App.css'

const hotels = [
    {
        id: 1,
        name: 'Aurelia Grand',
        location: 'Hà Nội, Việt Nam',
        price: '1.450.000',
        rating: '4.9',
        tag: 'Được yêu thích',
        image:
            'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=85',
    },
    {
        id: 2,
        name: 'Aurelia Ocean View',
        location: 'Đà Nẵng, Việt Nam',
        price: '2.100.000',
        rating: '4.8',
        tag: 'Hướng biển',
        image:
            'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=85',
    },
    {
        id: 3,
        name: 'Aurelia Retreat',
        location: 'Phú Quốc, Việt Nam',
        price: '2.850.000',
        rating: '5.0',
        tag: 'Nghỉ dưỡng',
        image:
            'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=85',
    },
]

function App() {
    const [destination, setDestination] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [guests, setGuests] = useState('2')
    const [selectedHotel, setSelectedHotel] = useState(null)
    const [bookingSent, setBookingSent] = useState(false)

    const filteredHotels = hotels.filter((hotel) => {
        const keyword = searchTerm.toLowerCase()
        return (
            hotel.name.toLowerCase().includes(keyword) ||
            hotel.location.toLowerCase().includes(keyword)
        )
    })

    function handleSearch(event) {
        event.preventDefault()
        setSearchTerm(destination.trim())
    }

    function handleBooking(event) {
        event.preventDefault()
        setBookingSent(true)
    }

    function openBooking(hotel) {
        setSelectedHotel(hotel)
        setBookingSent(false)
    }

    return (
        <div className="app">
            <header className="navbar">
                <a href="#" className="brand">
                    <span className="brand-symbol">✳</span>
                    <span>
                        <strong>AURELIA</strong>
                        <small>HOTELS & RESORTS</small>
                    </span>
                </a>

                <nav className="nav-links">
                    <a href="#home">Trang chủ</a>
                    <a href="#hotels">Khách sạn</a>
                    <a href="#about">Về Aurelia</a>
                </nav>

                <a href="#hotels" className="nav-button">
                    Khám phá ngay <span>↗</span>
                </a>
            </header>

            <main>
                <section className="hero" id="home">
                    <div className="hero-content">
                        <span className="eyebrow">
                            <span className="eyebrow-line" />
                            TRẢI NGHIỆM NGHỈ DƯỠNG ĐẲNG CẤP
                        </span>

                        <h1>
                            Hành trình đẹp,
                            <br />
                            <em>kỳ nghỉ đáng nhớ.</em>
                        </h1>

                        <p>
                            Khám phá những điểm đến tuyệt vời và tận hưởng
                            những khoảnh khắc đặc biệt cùng Aurelia.
                        </p>

                        <a href="#hotels" className="hero-link">
                            Khám phá khách sạn <span>→</span>
                        </a>
                    </div>

                    <div className="hero-caption">
                        <span>01 / 03</span>
                        <span>Những trải nghiệm vượt mong đợi</span>
                    </div>
                </section>

                <section className="search-section">
                    <form className="search-panel" onSubmit={handleSearch}>
                        <label className="search-field destination-field">
                            <span>ĐIỂM ĐẾN</span>
                            <input
                                type="text"
                                placeholder="Bạn muốn đi đâu?"
                                value={destination}
                                onChange={(event) => setDestination(event.target.value)}
                            />
                        </label>

                        <label className="search-field">
                            <span>NHẬN PHÒNG</span>
                            <input
                                type="date"
                                value={checkIn}
                                onChange={(event) => setCheckIn(event.target.value)}
                                required
                            />
                        </label>

                        <label className="search-field">
                            <span>TRẢ PHÒNG</span>
                            <input
                                type="date"
                                value={checkOut}
                                min={checkIn || undefined}
                                onChange={(event) => setCheckOut(event.target.value)}
                                required
                            />
                        </label>

                        <label className="search-field guests-field">
                            <span>SỐ KHÁCH</span>
                            <select
                                value={guests}
                                onChange={(event) => setGuests(event.target.value)}
                            >
                                <option value="1">1 khách</option>
                                <option value="2">2 khách</option>
                                <option value="3">3 khách</option>
                                <option value="4">4 khách</option>
                                <option value="5+">5+ khách</option>
                            </select>
                        </label>

                        <button type="submit" className="search-button">
                            <span>⌕</span> Tìm phòng
                        </button>
                    </form>
                </section>

                <section className="hotels-section" id="hotels">
                    <div className="section-heading">
                        <div>
                            <span className="section-label">LỰA CHỌN CỦA CHÚNG TÔI</span>
                            <h2>
                                Những điểm đến <em>nổi bật.</em>
                            </h2>
                        </div>
                        <p>
                            Không gian tinh tế, dịch vụ tận tâm và những
                            trải nghiệm khiến mỗi chuyến đi trở nên đáng nhớ.
                        </p>
                    </div>

                    <div className="hotel-grid">
                        {filteredHotels.map((hotel) => (
                            <article className="hotel-card" key={hotel.id}>
                                <div className="hotel-image-wrap">
                                    <img src={hotel.image} alt={hotel.name} />
                                    <span className="hotel-tag">{hotel.tag}</span>
                                    <button
                                        className="favorite-button"
                                        type="button"
                                        aria-label={`Yêu thích ${hotel.name}`}
                                        onClick={(event) => {
                                            event.currentTarget.classList.toggle('is-favorite')
                                        }}
                                    >
                                        ♡
                                    </button>
                                </div>

                                <div className="hotel-info">
                                    <div className="hotel-location">⌖ {hotel.location}</div>
                                    <div className="hotel-title-row">
                                        <h3>{hotel.name}</h3>
                                        <span className="rating">★ {hotel.rating}</span>
                                    </div>

                                    <div className="hotel-bottom">
                                        <p>
                                            <strong>{hotel.price}₫</strong>
                                            <span> / đêm</span>
                                        </p>
                                        <button
                                            className="detail-button"
                                            onClick={() => openBooking(hotel)}
                                            type="button"
                                        >
                                            Chọn phòng →
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    {filteredHotels.length === 0 && (
                        <div className="empty-state">
                            Không tìm thấy khách sạn phù hợp. Hãy thử một điểm đến khác.
                            <button onClick={() => {
                                setDestination('')
                                setSearchTerm('')
                            }}>
                                Xem tất cả khách sạn
                            </button>
                        </div>
                    )}
                </section>

                <section className="about-section" id="about">
                    <span className="section-label">THE AURELIA EXPERIENCE</span>
                    <h2>Mỗi chuyến đi là một câu chuyện riêng.</h2>
                    <p>
                        Aurelia hướng đến việc giúp bạn tìm thấy không gian
                        phù hợp cho những kỳ nghỉ thật trọn vẹn.
                    </p>
                </section>
            </main>

            <footer className="footer">
                <a href="#" className="brand footer-brand">
                    <span className="brand-symbol">✳</span>
                    <span>
                        <strong>AURELIA</strong>
                        <small>HOTELS & RESORTS</small>
                    </span>
                </a>
                <span>© 2026 Aurelia. Một hành trình đáng nhớ bắt đầu từ đây.</span>
            </footer>

            {selectedHotel && (
                <div
                    className="modal-backdrop"
                    onClick={() => setSelectedHotel(null)}
                >
                    <section
                        className="booking-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="booking-title"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <button
                            className="modal-close"
                            type="button"
                            onClick={() => setSelectedHotel(null)}
                            aria-label="Đóng"
                        >
                            ×
                        </button>

                        {bookingSent ? (
                            <div className="booking-success">
                                <span className="success-icon">✓</span>
                                <h2>Đã hoàn tất bản demo!</h2>
                                <p>
                                    Bạn đã thử luồng chọn phòng tại {selectedHotel.name}.
                                    Hiện tại website chưa lưu đặt phòng vào cơ sở dữ liệu.
                                </p>
                                <button
                                    className="search-button"
                                    onClick={() => setSelectedHotel(null)}
                                >
                                    Đóng
                                </button>
                            </div>
                        ) : (
                            <>
                                <span className="section-label">ĐẶT PHÒNG CÙNG AURELIA</span>
                                <h2 id="booking-title">{selectedHotel.name}</h2>
                                <p className="modal-location">{selectedHotel.location}</p>
                                <p className="modal-price">
                                    {selectedHotel.price}₫ <span>/ đêm</span>
                                </p>

                                <form className="modal-form" onSubmit={handleBooking}>
                                    <label>
                                        Ngày nhận phòng
                                        <input
                                            type="date"
                                            value={checkIn}
                                            onChange={(event) => setCheckIn(event.target.value)}
                                            required
                                        />
                                    </label>
                                    <label>
                                        Ngày trả phòng
                                        <input
                                            type="date"
                                            min={checkIn || undefined}
                                            value={checkOut}
                                            onChange={(event) => setCheckOut(event.target.value)}
                                            required
                                        />
                                    </label>
                                    <label>
                                        Số khách
                                        <select
                                            value={guests}
                                            onChange={(event) => setGuests(event.target.value)}
                                        >
                                            <option value="1">1 khách</option>
                                            <option value="2">2 khách</option>
                                            <option value="3">3 khách</option>
                                            <option value="4">4 khách</option>
                                            <option value="5+">5+ khách</option>
                                        </select>
                                    </label>
                                    <button type="submit" className="search-button">
                                        Tiếp tục đặt phòng →
                                    </button>
                                </form>
                                <p className="demo-note">
                                    Bản demo giao diện — chưa xác nhận phòng trống hay thanh toán.
                                </p>
                            </>
                        )}
                    </section>
                </div>
            )}
        </div>
    )
}

export default App
