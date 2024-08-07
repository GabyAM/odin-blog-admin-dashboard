import '../styles/comment.css';
import { useEffect, useRef, useState } from 'react';
import { DeleteIcon, EditIcon, VerticalDotsIcon } from './Icons';
import { PopupMenu } from './PopupMenu';
import { formatDateToDistance } from '../utils/date';
import { IMAGES_URL } from '../constants';
import avatarPlaceholder from '../assets/profile.png';

export function Comment({ comment, onEdit, onDelete }) {
    const text = useRef(null);
    const [commentText, setCommentText] = useState(comment.text);
    const [isOverflown, setIsOverflown] = useState(false);
    const [textHidden, setTextHidden] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        setCommentText(comment.text);
    }, [comment]);
    useEffect(() => {
        if (text.current && !isEditing) {
            const textHeight = text.current.getBoundingClientRect().height;
            setIsOverflown(textHeight > 160);
        }
    }, [text, isEditing]);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isDeleted = comment.user === null;

    return (
        <div
            className={`comment-container-wrapper flex-col ${comment.isPending ? 'pending' : ''}`}
            key={comment._id}
        >
            <h3>
                {comment.parent_comment
                    ? `In response to a comment on post "${comment.post.title}"`
                    : `On post "${comment.post.title}"`}
            </h3>
            <div className="flex-col">
                <div className="comment-container flex-col">
                    <div
                        className={
                            'comment' +
                            (!textHidden || isEditing ? ' expanded' : '') +
                            (isDeleted ? ' deleted' : '')
                        }
                    >
                        {isDeleted ? (
                            <span>This comment was removed</span>
                        ) : (
                            <>
                                <div className="image-container">
                                    <img
                                        src={
                                            comment.user.image ===
                                            '/images/profile.png'
                                                ? avatarPlaceholder
                                                : IMAGES_URL +
                                                  comment.user.image
                                        }
                                    ></img>
                                </div>
                                <div className="comment-text">
                                    <div className="comment-text-upper-section">
                                        <span>{comment.user.name}</span>
                                        {comment.user.is_banned && (
                                            <span className="banned-label">
                                                BANNED USER
                                            </span>
                                        )}
                                        <span className="timestamp-label">
                                            {formatDateToDistance(
                                                comment.createdAt
                                            )}
                                        </span>
                                    </div>
                                    {isEditing ? (
                                        <textarea
                                            className="comment-content"
                                            defaultValue={commentText}
                                            rows={3}
                                            onChange={(e) =>
                                                setCommentText(e.target.value)
                                            }
                                        ></textarea>
                                    ) : (
                                        <>
                                            <p
                                                ref={text}
                                                className={`comment-content ${
                                                    isOverflown && textHidden
                                                        ? 'overflown'
                                                        : ''
                                                }`}
                                            >
                                                {commentText}
                                            </p>
                                            {isOverflown && (
                                                <button
                                                    className="toggle-comment-length"
                                                    onClick={() =>
                                                        setTextHidden(
                                                            !textHidden
                                                        )
                                                    }
                                                >
                                                    {textHidden
                                                        ? 'Show more'
                                                        : 'Show less '}
                                                </button>
                                            )}
                                        </>
                                    )}
                                </div>
                            </>
                        )}
                        {!isDeleted && (
                            <div className="comment-options-section">
                                <button
                                    onClick={() => setIsMenuOpen(true)}
                                    className="icon-container more-button"
                                >
                                    <VerticalDotsIcon></VerticalDotsIcon>
                                </button>
                                {isMenuOpen && (
                                    <PopupMenu
                                        onClickOutside={() =>
                                            setIsMenuOpen(false)
                                        }
                                    >
                                        {!isDeleted && (
                                            <button
                                                onClick={() => {
                                                    setIsEditing(true);
                                                    setIsMenuOpen(false);
                                                }}
                                                className="popup-menu-option"
                                            >
                                                <EditIcon></EditIcon>
                                                <span>Edit</span>
                                            </button>
                                        )}
                                        <button
                                            onClick={() => {
                                                onDelete(comment._id);
                                                setIsMenuOpen(false);
                                            }}
                                            className="popup-menu-option"
                                        >
                                            <DeleteIcon></DeleteIcon>
                                            <span>Delete</span>
                                        </button>
                                    </PopupMenu>
                                )}
                            </div>
                        )}
                    </div>
                    {isEditing && (
                        <div
                            className={`comment-actions ${isEditing ? 'edit-mode' : ''}`}
                        >
                            <>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="tertiary-button rounded small"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        onEdit(
                                            comment._id,
                                            comment.text,
                                            commentText
                                        );
                                        setIsEditing(false);
                                    }}
                                    className="primary-button rounded small"
                                >
                                    Submit
                                </button>
                            </>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
