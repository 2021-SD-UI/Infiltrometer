
import React, { useEffect } from 'react';

export const Initializer = (assets) => {



    const getAssets = () => assets;

    return <div hidden>{getAssets}</div>;
}
