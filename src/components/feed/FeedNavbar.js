import React from 'react';

const FeedNavbar = ({ categories, getCategory, selected }) => (
    <div className="feed__navbar">
        {categories.map((category, i) =>
            <div key={i} onClick={() => getCategory(category)} className={selected === category ? `feed__navbar__navbar-item selected` : `feed__navbar__navbar-item`}>
                {category}
            </div>
        )}
    </div>
);

export default FeedNavbar;
