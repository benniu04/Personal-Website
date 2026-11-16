// The journey, in scroll order. `cam` and `look` are world-space camera keyframes;
// `shift` nudges the scene inside the frame (fractions of the viewport, +x right,
// +y down) so the landmark sits clear of the text: [landscape, portrait].
export const STOPS = [
  { id: 'top', label: 'Arrival', cam: [0, 17, 80], look: [0, 4, 0], shift: [[0.2, 0], [0, 0.16]] },
  { id: 'about', label: 'About', cam: [27, 7, 35], look: [11, 1.4, 15], shift: [[0.2, 0], [0, -0.04]] },
  { id: 'experience', label: 'Experience', cam: [-10, 7, 27], look: [-12, 3.6, 6], shift: [[0.2, 0], [0, -0.04]] },
  { id: 'work', label: 'Workshop', cam: [36, 8, 4], look: [16, 2, -4], shift: [[0.2, 0], [0, -0.04]] },
  { id: 'off-the-clock', label: 'Off the clock', cam: [20, 9, -33], look: [8, 1.5, -15], shift: [[0.2, 0], [0, -0.04]] },
  { id: 'contact', label: 'Contact', cam: [-15, 14.6, -19], look: [-6, 12.1, -8], shift: [[0.2, 0], [0, -0.04]] },
]
