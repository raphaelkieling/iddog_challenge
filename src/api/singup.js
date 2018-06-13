'use strict'

import { domainName } from './config';

export function singup() {
    fetch(domainName)
        .then(res => res.json())
        .then(console.log)
}