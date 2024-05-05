import React from "react";

export default function Sort({ handleSortChange, type, sortDirection }) {
    return (
        <>
            <button className="btn btn-light btn-sm" onClick={() => handleSortChange(type)}>
                {sortDirection === 'asc' ? <i className="bi bi-filter"></i> : <i className="bi bi-filter"></i>}
            </button>
        </>
    )
}
