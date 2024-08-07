import { useNavigate } from 'react-router-dom';
import '../styles/postcard.css';
import { useState } from 'react';
import {
    DeleteIcon,
    EditIcon,
    PublishIcon,
    UnpublishIcon,
    VerticalDotsIcon
} from './Icons';
import { PopupMenu } from './PopupMenu';
import { useSearch } from '../hooks/useSearch';
import { IMAGES_URL } from '../constants';
import postThumbnailPlaceholder from '../assets/post_thumbnail_placeholder.png';

export function PostCard({ post, onToggleState, onDelete }) {
    const navigate = useNavigate();
    const { setSearch } = useSearch();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className={`post-card ${post.isPending ? 'pending' : ''}`}>
            <div className="post-thumbnail">
                <img
                    src={
                        post.image === '/images/post_thumbnail_placeholder.png'
                            ? postThumbnailPlaceholder
                            : IMAGES_URL + post.image
                    }
                ></img>
            </div>
            <div className="text-section flex-col">
                <h2 className="title-primary">{post.title}</h2>
                <p>{post.summary}</p>
            </div>
            <div className="options-section">
                <button
                    disabled={post.isPending}
                    onClick={() => setIsMenuOpen(true)}
                    className="icon-container more-button"
                >
                    <VerticalDotsIcon></VerticalDotsIcon>
                </button>
                {isMenuOpen && (
                    <PopupMenu onClickOutside={() => setIsMenuOpen(false)}>
                        <button
                            onClick={() => {
                                setIsMenuOpen(false);
                                onToggleState(post._id, post.is_published);
                            }}
                            className="popup-menu-option"
                        >
                            {post.is_published ? (
                                <>
                                    <UnpublishIcon></UnpublishIcon>
                                    <span>Unpublish</span>
                                </>
                            ) : (
                                <>
                                    <PublishIcon></PublishIcon>
                                    <span>Publish</span>
                                </>
                            )}
                        </button>
                        <button
                            className="popup-menu-option"
                            onClick={() => {
                                navigate(`/post/${post._id}`);
                                setSearch('');
                            }}
                        >
                            <EditIcon></EditIcon>
                            <span>Edit</span>
                        </button>
                        <button
                            onClick={() => {
                                setIsMenuOpen(false);
                                onDelete(post._id);
                            }}
                            className="popup-menu-option"
                        >
                            <DeleteIcon></DeleteIcon>
                            <span>Delete</span>
                        </button>
                    </PopupMenu>
                )}
            </div>
        </div>
    );
}
