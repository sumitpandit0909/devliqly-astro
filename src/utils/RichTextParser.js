export function parseRichText(richText) {
  let html = '';
  
  richText.forEach(block => {
    switch (block.style) {
      case 'h1':
        html += `<h1>${parseChildren(block.children)}</h1>`;
        break;
      case 'h3':
        html += `<h3>${parseChildren(block.children)}</h3>`;
        break;
      case 'h4':
        html += `<h4>${parseChildren(block.children)}</h4>`;
        break;
      case 'blockquote':
        html += `<blockquote>${parseChildren(block.children)}</blockquote>`;
        break;
      case 'normal':
        if (block.listItem === 'bullet') {
          html += `<ul><li>${parseChildren(block.children)}</li></ul>`;
        } else {
          html += `<p>${parseChildren(block.children)}</p>`;
        }
        break;
      case 'image':
        if (block.asset && block.asset._ref) {
          const imageUrl = `https://cdn.sanity.io/images/your-project-id/${block.asset._ref.split('-')[1]}.jpg`; // Adjust with your actual project ID
          html += `<img src="${imageUrl}" alt="Image" />`;
        }
        break;
      default:
        break;
    }
  });

  return html;
}

function parseChildren(children) {
  let text = '';
  
  children.forEach(child => {
    if (child._type === 'span') {
      let spanText = child.text;
      
      child.marks.forEach(mark => {
        if (mark === 'strong') {
          spanText = `<strong>${spanText}</strong>`;
        } else if (mark === 'em') {
          spanText = `<em>${spanText}</em>`;
        } else if (mark.startsWith('c2a29228eecd')) { // Link mark identifier
          if (child.markDefs && child.markDefs[0] && child.markDefs[0].href) {
            spanText = `<a href="${child.markDefs[0].href}">${spanText}</a>`;
          }
        }
      });
      text += spanText;
    }
  });

  return text;
}
