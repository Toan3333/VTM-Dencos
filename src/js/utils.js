export function appendFineAnt() {
	const script = document.createElement('script');
	script.src = 'https://www.fireant.vn/Scripts/web/widgets.js';
	script.defer = true;
	script.onload = () => {
		new FireAnt.QuoteWidget({
			container_id: 'fan-quote-373',
			symbols: 'IJC',
			locale: 'vi',
			price_line_color: '#71BDDF',
			grid_color: '#999999',
			label_color: '#999999',
			width: '100%',
			height: '200px',
		});
	};
	document.querySelector('.iframe-fineant').appendChild(script);
	console.log('🟢 Fineant is added!');
}
export function showResolutionWeb() {
	const width = $(window).width();
	const height = $(window).height();
	$('main').append(
		`<style>.show-resolution-web{position: fixed; right: 0; bottom: 0; background-color: #f73936; color: white; z-index: 100; padding: 1rem;}</style><div class="show-resolution-web"><p>Width: ${width}px</p> <p>Height: ${height}px</p></div>`
	);
}

export function isSvgFile(src) {
	// Check if the source URL ends with .svg
	return src.toLowerCase().endsWith('.svg');
}

export function convertImgToSvg(imgElement) {
	// Get the src attribute of the img element
	const imgSrc =
		imgElement.getAttribute('src') || imgElement.getAttribute('data-src');

	if (!isSvgFile(imgSrc)) {
		// Alert
		console.error('Not an SVG file:', imgSrc);

		const notSvgImg = document.createElement('img');
		notSvgImg.className = 'img-generate';
		notSvgImg.style.opacity = 1;
		notSvgImg.src = imgSrc;
		// Replace the original image element with the new one
		imgElement.parentNode.replaceChild(notSvgImg, imgElement);
		return;
	}

	function setStrokeDashArrayInline(svgContent) {
		// Create a new DOM element to parse the SVG content
		const tempDiv = document.createElement('div');
		tempDiv.innerHTML = svgContent;

		// Find all vector path elements in the SVG
		const vectorPaths = tempDiv.querySelectorAll('path');

		// Iterate through vector paths and calculate the stroke-dasharray
		vectorPaths.forEach(path => {
			const isContainStrokeDasharray = path.getAttribute('stroke-dasharray');
			const pathLength = path.getTotalLength();
			path.style.setProperty('--data-stroke-dasharray', pathLength);
			if (isContainStrokeDasharray) return;
			path.setAttribute('stroke-dasharray', pathLength);
		});

		// Return the modified SVG content
		return tempDiv.innerHTML;
	}

	const observer = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				// Fetching Image SVG
				fetch(imgSrc)
					.then(response => response.text())
					.then(svgContent => {
						const modifiedSvgContent = setStrokeDashArrayInline(svgContent);
						// Create a temporary div element to parse the SVG content
						const tempDiv = document.createElement('div');
						const isError = svgContent.includes('<title>Error</title>');
						tempDiv.className = 'svg-generate';
						if (isError)
							tempDiv.innerHTML =
								"<span class='image-not-found'>Image has been removed or moved.</span>";
						else tempDiv.innerHTML = modifiedSvgContent;
						tempDiv.setAttribute('data-src', imgSrc);
						// Replace the img element with the new svg element
						imgElement.parentNode.replaceChild(tempDiv, imgElement);

						const svgLoadedEvent = new CustomEvent('generate-svg', {
							detail: {
								element: tempDiv,
								source: imgSrc,
								content: modifiedSvgContent,
								isError: isError,
								imgElement,
							},
						});
						document.body.dispatchEvent(svgLoadedEvent);

						// Stop observing the element after it's loaded
						observer.unobserve(imgElement);
					})
					.catch(error => {
						console.error('Error fetching or replacing image:', error);
					});
			}
		});
	});
	// Start observing the image element
	observer.observe(imgElement);
}
