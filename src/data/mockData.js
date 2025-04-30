// Mock chat history data
export const mockChatHistory = [
  {
    id: 'chat-1',
    title: 'UI Design with Yellow',
    date: '2023-04-28T14:30:00Z',
    messages: [
      {
        id: 'msg-1',
        content: 'How would I create a UI with yellow as the primary color?',
        isUser: true,
        timestamp: '2023-04-28T14:30:00Z'
      },
      {
        id: 'msg-2',
        content: 'Yellow is a vibrant color that can create a cheerful interface. For a yellow UI design, consider using a muted yellow (#F5D547) as your primary color and complement it with dark grays or navy blue for text to ensure readability. Use brighter yellow accents sparingly for important elements like call-to-action buttons.',
        isUser: false,
        timestamp: '2023-04-28T14:31:00Z'
      }
    ]
  },
  {
    id: 'chat-2',
    title: 'React component and CSS',
    date: '2023-04-27T09:15:00Z',
    messages: [
      {
        id: 'msg-3',
        content: 'What are the best practices for organizing React components and CSS?',
        isUser: true,
        timestamp: '2023-04-27T09:15:00Z'
      },
      {
        id: 'msg-4',
        content: 'For organizing React components and CSS, consider using a modular approach like CSS Modules or styled-components. Structure your folders by feature or component, keeping related files together. Always aim to create reusable components that are focused on a single responsibility.',
        isUser: false,
        timestamp: '2023-04-27T09:16:00Z'
      }
    ]
  },
  {
    id: 'chat-3',
    title: 'Services Grid Layout',
    date: '2023-04-26T13:45:00Z',
    messages: [
      {
        id: 'msg-5',
        content: 'How do I create a responsive services grid layout?',
        isUser: true,
        timestamp: '2023-04-26T13:45:00Z'
      },
      {
        id: 'msg-6',
        content: 'For a responsive services grid, CSS Grid is an excellent choice. Try using: `display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));` This creates equal columns that automatically adjust based on screen size, with each column being at least 250px wide.',
        isUser: false,
        timestamp: '2023-04-26T13:46:00Z'
      }
    ]
  },
  {
    id: 'chat-4',
    title: 'Image Variant Request',
    date: '2023-04-25T16:20:00Z',
    messages: [
      {
        id: 'msg-7',
        content: 'What\'s the best way to handle image variants in a web app?',
        isUser: true,
        timestamp: '2023-04-25T16:20:00Z'
      },
      {
        id: 'msg-8',
        content: 'For handling image variants, consider using the srcset attribute for responsive images. Additionally, implement a systematic naming convention for your image files to easily identify variants. You might also want to use an image CDN service that can generate variants on-the-fly based on URL parameters.',
        isUser: false,
        timestamp: '2023-04-25T16:21:00Z'
      }
    ]
  },
  {
    id: 'chat-5',
    title: 'Header Customization',
    date: '2023-04-24T11:10:00Z',
    messages: [
      {
        id: 'msg-9',
        content: 'How can I create a customizable header component in React?',
        isUser: true,
        timestamp: '2023-04-24T11:10:00Z'
      },
      {
        id: 'msg-10',
        content: 'To create a customizable header in React, design it to accept props for variations. You could have props like `variant` (e.g., "primary", "minimal"), `backgroundColor`, `textColor`, and `showLogo`. Use these props to conditionally apply styles or render components. Consider using a config object pattern for complex header configurations.',
        isUser: false,
        timestamp: '2023-04-24T11:12:00Z'
      }
    ]
  }
];