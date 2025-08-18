import css from "./MovieModal.module.css";
import { useEffect } from "react";
import type { Movie } from "../../types/movie";
import { createPortal } from "react-dom";

interface MovieModalProps {
	movie: Movie;
	onClose: () => void;
}

const MovieModal = ({ movie, onClose }: MovieModalProps) => {
	const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				onClose();
			}
		};
		document.addEventListener("keydown", handleKeyDown);
		document.body.style.overflow = "hidden";
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.body.style.overflow = "";
		};
	}, [onClose]);

	return createPortal(
		<div
			onClick={handleBackgroundClick}
			className={css.backdrop}
			role="dialog"
			aria-modal="true">
			<div className={css.modal}>
				<button
					onClick={onClose}
					className={css.closeButton}
					aria-label="Close modal">
					&times;
				</button>
				<img
					src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
					alt={movie.title}
					className={css.image}
				/>
				<div className={css.content}>
					<h2>{movie.title}</h2>
					<p>{movie.overview}</p>
					<p>
						<strong>Release Date:</strong>
						{movie.release_date}
					</p>
					<p>
						<strong>Rating:</strong>
						{movie.vote_average}
					</p>
				</div>
			</div>
		</div>,
		document.body
	);
};

export default MovieModal;
