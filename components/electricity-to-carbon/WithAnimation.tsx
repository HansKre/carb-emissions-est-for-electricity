import React from 'react';
import {motion} from 'framer-motion';

type Props = {
    children: JSX.Element
}

export default function WithAnimation(props: Props) {
    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 1}}
        >
            {props.children}
        </motion.div>
    )
}
