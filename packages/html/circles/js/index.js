const stage = document.querySelector('.stage');

const bodyRange = document.createRange();
bodyRange.setStart(document.body, 0);

function parse(str) {
  const frag = bodyRange.createContextualFragment(str);
  return frag.firstElementChild;
}

function generateCircles() {
  const container = parse(`<div class="container"></div>`);
  const { width, height } = stage.getBoundingClientRect();
  const maxRadius = 0.2 * Math.max(width, height);
  const strokeWidth = Math.min(20, Math.min(width, height) / 50);
  const minSpace = strokeWidth * 2;
  const circles = [];

  createCircles: while (true) {
    let x; // circle center x.
    let y; // circle center y.
    let r; // circle radius.
    let miss = 0; // Number of times we've failed to place a circle.

    randomCircle: while (true) {
      // Create random position
      x = Math.random() * width;
      y = Math.random() * height;
      r = maxRadius;

      // Go through existing circles, and reduce the size of this circle so it
      // doesn't intersect others.
      for (const circle of circles) {
        // Calculate distance to this circle
        const xDiff = circle.x - x;
        const yDiff = circle.y - y;
        const centerDistance = Math.sqrt((xDiff ** 2) + (yDiff ** 2));

        // It looks a bit crap if a circle appears centered within another.
        if (centerDistance < 20) continue randomCircle;

        const space = centerDistance - circle.r;

        if (space > -minSpace && space < minSpace) {
          // Circle is too close to another
          miss++;

          // If we've failed to create 200 circles, probably best that we stop trying.
          // lol yeah this is a massive hack.
          // Don't look at me like that, I threw this together quickly.
          // C'mon, like you haven't written hackier code.
          // Yeah I'm sure there's some smart mathsy way to do this.
          // My school failed ofstead give me a break.
          // Look, if you have a smarter way of doing this, I'm genuinely interested.
          // Anyway…
          if (miss > 200) {
            break createCircles;
          }

          // Try again.
          continue randomCircle;
        }

        // Reduce the radius of this circle so it doesn't intersect the other.
        r = Math.min(Math.abs(space) - strokeWidth, r);
      }

      break;
    }

    // Add our circle.
    circles.push({ x, y, r });
  }

  // Right, we're done defining our circles.
  // Now to make the elements.

  // Order the circles by radius.
  circles.sort((a, b) => {
    if (a.r < b.r) return 1;
    return -1;
  });

  for (const [i, circle] of circles.entries()) {
    const boxSize = strokeWidth;

    // Create SVG for the circle.
    // This is also the element that rotates.
    const rotator = parse(`
      <svg width="${circle.r * 2 + strokeWidth}" height="${circle.r * 2 + strokeWidth}" class="rotator">
        <circle cx="${circle.r + strokeWidth / 2}" cy="${circle.r + strokeWidth / 2}" r="${circle.r}" stroke-width="${strokeWidth}" />
        <rect x="${circle.r + strokeWidth / 2 - boxSize / 2}" y="${strokeWidth / 2 - boxSize / 2}" width="${boxSize}" height="${boxSize}" />
      </svg>
    `);

    // We need an element to scale, to grow the circle.
    const scaler = parse(`<div class="scaler"></div>`);
    scaler.appendChild(rotator);

    // Delay each circle appearing a little more.
    scaler.style.animationDelay = `${i*200}ms`;

    // We need an element to position the circle.
    const positioner = parse(`<div class="positioner"></div>`);
    positioner.appendChild(scaler);

    // Give it its position & a random rotation.
    positioner.style.transform = `translate(${circle.x - circle.r - strokeWidth / 2}px, ${circle.y - circle.r - strokeWidth / 2}px) rotate(${Math.random() * 360}deg)`;

    // Add the element to the stage.
    container.appendChild(positioner);
  }

  stage.appendChild(container);
}

const backgrounds = ['sunny', 'ocean', 'day', 'swamp', 'dawn', 'love'];

function randomBackground() {
  const currentClass = stage.classList[1];
  const otherBackgrounds = backgrounds.filter(b => b !== currentClass);
  const randomClass = otherBackgrounds[Math.floor(Math.random() * otherBackgrounds.length)];
  stage.classList.remove(currentClass);
  stage.classList.add(randomClass);
}

function clear() {
  stage.innerHTML = '';
}

requestAnimationFrame(() => {
  randomBackground();
  generateCircles();
});

window.addEventListener('resize', () => {
  console.log('resize');
  clear();
  generateCircles();
});

document.addEventListener('click', () => {
  clear();
  randomBackground();
  generateCircles();
});