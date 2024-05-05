export default function Header() {
    return (<>
        <div className="d-flex align-items-center justify-content-center mt-3">
            <div className="w-75 mx-auto d-flex justify-content-between align-items-center" style={{ height: '10vh' }}>
                <div className="flex-grow-1">
                    <h3>APPOINTMENT</h3>
                </div>
                <div className="p-2">
                    <svg width="50" height="50" className="p-1 rounded-circle border border-1 border-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" id="user">
                        <path fill="#42c3cf" d="M31.64,27.72a13.94,13.94,0,0,1-15.28,0A18,18,0,0,0,6.05,42.94a1,1,0,0,0,.27.75,1,1,0,0,0,.73.31H41a1,1,0,0,0,.73-.31,1,1,0,0,0,.27-.75A18,18,0,0,0,31.64,27.72Z"></path>
                        <circle cx="24" cy="16" r="12" fill="#42c3cf"></circle>
                    </svg>
                </div>
                <div className="p-2">
                    <h6 className="">Jonitha Cathrine</h6>
                    <span>admin</span>
                </div>
            </div>
        </div>
    </>)
}