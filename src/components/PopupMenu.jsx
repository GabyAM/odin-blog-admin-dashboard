import { Fragment, useEffect, useRef, useState } from 'react';
import '../styles/popupmenu.css';
import { useClickOutside } from '../hooks/useClickOutside';

export function PopupMenu({ children, onClickOutside }) {
    const ref = useClickOutside(onClickOutside);

    const [isLeft, setIsLeft] = useState(false);
    function handlePositionMenu() {
        if (ref.current) {
            const width = ref.current.getBoundingClientRect().width;
            const shouldBeLeft =
                ref.current.offsetLeft + width > window.innerWidth;

            setIsLeft((prevIsLeft) => {
                if (prevIsLeft !== shouldBeLeft) {
                    return shouldBeLeft;
                }
                return prevIsLeft;
            });
        }
    }
    useEffect(() => {
        handlePositionMenu();
    }, [ref.current]);
    useEffect(() => {
        window.addEventListener('resize', handlePositionMenu);
        return () => window.removeEventListener('resize', handlePositionMenu);
    }, []);

    const filteredChildren = children.filter((children) => children !== false);
    return (
        <div
            ref={ref}
            className={`popup-menu ${!ref.current ? 'hidden' : ''} ${isLeft ? 'left' : ''}`}
        >
            {filteredChildren.length &&
                filteredChildren.map((element, index) => (
                    <Fragment key={index}>
                        {element}
                        {index < filteredChildren.length - 1 && (
                            <div className="popup-menu-separator"></div>
                        )}
                    </Fragment>
                ))}
        </div>
    );
}
