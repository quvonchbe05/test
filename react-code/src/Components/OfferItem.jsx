import React from 'react';

const OfferItem = ({item}) => {
    return (
        <div className="card mb-3">
            <div className="row g-0">
                <div className="col-md-4 p-3">
                    <img src={item.image.url} width={`${item.image.width}`} height={`${item.image.height}`} />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <p className="card-text">{item.merchant}</p>
                        <p className="card-text"><b>Category: </b>{item.category}</p>
                        <p className="card-text"><b>Brand: </b>{item.brand}</p>
                        {
                            item.attributes.map((item, index) => (
                                <p className="card-text"><b>{item.name}: </b>{item.value}</p>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OfferItem;
