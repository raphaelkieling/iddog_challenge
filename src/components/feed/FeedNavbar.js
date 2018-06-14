import React from 'react';

const FeedNavbar = ({ categories, getCategory }) => (
    <div>
        {categories.map((category, i) =>
            <div key={i} onClick={() => getCategory(category)}>
                {category}
            </div>
        )}
    </div>
)

export default FeedNavbar;
