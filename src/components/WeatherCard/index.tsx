import React from 'react';
import './WeatherCard.css';

const WeatherCard = () => {
	return (
		<div className="weather-card-container">
			<div className="weather-card">
				<div className="weather-card-wrapper">
					<div className="details">
						<p className="wheather">Sunny</p>
						<div className="details-information">
							<div className="temp">25°</div>
							<div className="vertical-line"></div>
							<div className="information">
								<p>data</p>
								<p>location</p>
							</div>
						</div>
					</div>
					<img
						src="https://th.bing.com/th/id/OIP.zlfhR4goqFFtyvA8OWbEJwHaHa?pid=ImgDet&rs=1"
						alt=""
						width={69}
						height={69}
						className='img'
					/>
				</div>
			</div>
		</div>
	);
};

export default WeatherCard;
