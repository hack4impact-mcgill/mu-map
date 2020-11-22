import React from 'react';
import { render } from '@testing-library/react';
import Map from './Map';

test('renders learn react link', () => {
    render(<Map />);
    expect(<Map />).toBeInTheDocument();
});
