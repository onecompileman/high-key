import { Component, OnInit, HostListener } from '@angular/core';

@Component({
	selector: 'wm-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {
	title = 'waveplay-memory-game';

	ngOnInit() {
		this.resetHeight();
	}

	@HostListener('window:resize', [ '$event' ])
	resize() {
		this.resetHeight();
	}

	private resetHeight() {
		document.body.style.height = innerHeight + 'px';
	}
}
