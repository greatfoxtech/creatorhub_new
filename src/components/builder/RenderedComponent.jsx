import React from 'react';
import { Button } from '@/components/ui/button';
import { Star, Heart, Check, X, ArrowRight, Menu, User, Search, Facebook, Twitter, Instagram, Linkedin, Youtube, Github } from 'lucide-react';

const iconMap = {
  Star, Heart, Check, X, ArrowRight, Menu, User, Search, Facebook, Twitter, Instagram, Linkedin, Youtube, Github
};

export default function RenderedComponent({ element }) {
  const { type, props } = element;

  const baseStyle = {
    padding: props.padding ? `${props.padding}px` : undefined,
    margin: props.margin ? `${props.margin}px` : undefined,
    color: props.color,
    backgroundColor: props.backgroundColor,
    borderColor: props.borderColor,
    borderWidth: props.borderWidth ? `${props.borderWidth}px` : undefined,
    borderStyle: props.borderWidth ? 'solid' : undefined,
    borderRadius: props.borderRadius ? `${props.borderRadius}px` : undefined,
    fontFamily: props.fontFamily !== 'inherit' ? props.fontFamily : undefined,
    fontSize: props.fontSize ? `${props.fontSize}px` : undefined,
    fontWeight: props.fontWeight,
    textAlign: props.textAlign,
  };

  switch (type) {
    case 'Heading': {
      const Tag = props.level || 'h2';
      return <Tag style={baseStyle}>{props.text || 'Your Heading'}</Tag>;
    }

    case 'Text':
      return <p style={baseStyle}>{props.text || 'Your text content goes here'}</p>;

    case 'Image': {
      const imgStyle = {
        ...baseStyle,
        width: '100%',
        height: 'auto',
        display: 'block',
      };
      const img = <img src={props.src || 'https://via.placeholder.com/800x400'} alt={props.alt || 'Image'} style={imgStyle} />;
      return props.href ? <a href={props.href} target="_blank" rel="noopener noreferrer">{img}</a> : img;
    }

    case 'Button': {
      const sizeClasses = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2',
        lg: 'px-6 py-3 text-lg',
      };
      return (
        <div style={{ padding: baseStyle.padding, margin: baseStyle.margin }}>
          <Button
            className={sizeClasses[props.size || 'md']}
            style={{
              backgroundColor: props.backgroundColor || '#4368D9',
              color: props.color || '#ffffff',
            }}
            onClick={() => props.href && window.open(props.href, props.newTab ? '_blank' : '_self')}
          >
            {props.text || 'Click Me'}
          </Button>
        </div>
      );
    }

    case 'Icon': {
      const IconComponent = iconMap[props.icon] || Star;
      return (
        <div style={baseStyle}>
          <IconComponent size={props.size || 24} color={props.color || '#000000'} />
        </div>
      );
    }

    case 'Divider':
      return (
        <div style={{ ...baseStyle, padding: `${props.padding || 16}px 0` }}>
          <hr
            style={{
              borderColor: props.color || '#e5e7eb',
              borderWidth: `${props.thickness || 1}px 0 0 0`,
              borderStyle: props.style || 'solid',
              margin: 0,
            }}
          />
        </div>
      );

    case 'Spacer':
      return <div style={{ height: `${props.height || 32}px` }} />;

    case 'Video': {
      const isYouTube = props.src?.includes('youtube.com') || props.src?.includes('youtu.be');
      if (isYouTube) {
        const videoId = props.src.split('v=')[1]?.split('&')[0] || props.src.split('/').pop();
        return (
          <div style={baseStyle}>
            <iframe
              width="100%"
              height="400"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=${props.autoplay ? 1 : 0}&controls=${props.controls !== false ? 1 : 0}`}
              title="YouTube video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        );
      }
      return (
        <div style={baseStyle}>
          <video
            src={props.src}
            controls={props.controls !== false}
            autoPlay={props.autoplay}
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
      );
    }

    case 'Container':
      return (
        <div style={{ ...baseStyle, maxWidth: props.maxWidth || '1200px', margin: '0 auto' }}>
          {props.children || <p className="text-gray-400 text-center py-8">Container - Drop components here</p>}
        </div>
      );

    case 'Section':
      return (
        <section style={baseStyle}>
          {props.children || <p className="text-gray-400 text-center py-8">Section - Drop components here</p>}
        </section>
      );

    case 'Header':
      return (
        <header style={{ ...baseStyle, backgroundColor: props.backgroundColor || '#ffffff', borderBottom: '1px solid #e5e7eb' }} className="py-4 px-6">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="text-xl font-bold">{props.title || 'Logo'}</div>
            <nav className="flex gap-6">
              <a href="#" className="hover:text-blue-600">Home</a>
              <a href="#" className="hover:text-blue-600">About</a>
              <a href="#" className="hover:text-blue-600">Contact</a>
            </nav>
          </div>
        </header>
      );

    case 'Footer':
      return (
        <footer style={{ ...baseStyle, backgroundColor: props.backgroundColor || '#1f2937', color: '#ffffff' }} className="py-8 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <p>{props.text || '© 2025 Your Company. All rights reserved.'}</p>
          </div>
        </footer>
      );

    case 'Card':
      return (
        <div style={{ ...baseStyle, border: '1px solid #e5e7eb' }} className="rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-2">{props.title || 'Card Title'}</h3>
          <p className="text-gray-600">{props.description || 'Card description goes here'}</p>
        </div>
      );

    case 'ButtonGroup':
      return (
        <div style={baseStyle} className="flex gap-2 flex-wrap">
          <Button>Button 1</Button>
          <Button variant="outline">Button 2</Button>
          <Button variant="ghost">Button 3</Button>
        </div>
      );

    case 'Form':
    case 'ContactForm':
      return (
        <div style={baseStyle} className="max-w-md">
          <h3 className="text-xl font-semibold mb-2">{props.title || 'Contact Us'}</h3>
          {props.description && <p className="text-gray-600 mb-4">{props.description}</p>}
          <form className="space-y-4">
            <input type="text" placeholder="Name" className="w-full p-2 border rounded" />
            <input type="email" placeholder="Email" className="w-full p-2 border rounded" />
            <textarea placeholder="Message" rows={4} className="w-full p-2 border rounded" />
            <Button type="submit">{props.submitText || 'Submit'}</Button>
          </form>
        </div>
      );

    case 'HeroSection':
      return (
        <div style={{ ...baseStyle, backgroundColor: props.backgroundColor || '#f3f4f6' }} className="py-20 px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">{props.title || 'Welcome to Your Site'}</h1>
          <p className="text-xl text-gray-600 mb-8">{props.subtitle || 'Create amazing things'}</p>
          <Button size="lg">{props.ctaText || 'Get Started'}</Button>
        </div>
      );

    case 'PortfolioGrid':
      return (
        <div style={baseStyle} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="aspect-square bg-gray-200 rounded-lg" />
          ))}
        </div>
      );

    case 'Feed':
      return (
        <div style={baseStyle} className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 rounded-full bg-gray-300" />
                <div>
                  <p className="font-semibold">User {i}</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <p className="text-gray-700">This is a sample post in the feed...</p>
            </div>
          ))}
        </div>
      );

    case 'Stories':
      return (
        <div style={baseStyle} className="flex gap-2 overflow-x-auto">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex-shrink-0">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-1">
                <div className="w-full h-full rounded-full bg-gray-200" />
              </div>
              <p className="text-xs text-center mt-1">Story {i}</p>
            </div>
          ))}
        </div>
      );

    case 'Reels':
      return (
        <div style={baseStyle} className="grid grid-cols-3 gap-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="aspect-[9/16] bg-gray-900 rounded-lg relative">
              <div className="absolute inset-0 flex items-center justify-center text-white">
                <p>Reel {i}</p>
              </div>
            </div>
          ))}
        </div>
      );

    case 'ProductGrid':
      return (
        <div style={baseStyle} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border rounded-lg overflow-hidden">
              <div className="aspect-square bg-gray-200" />
              <div className="p-4">
                <h4 className="font-semibold">Product {i}</h4>
                <p className="text-gray-600">$99.99</p>
              </div>
            </div>
          ))}
        </div>
      );

    case 'HTML':
      return (
        <div style={baseStyle} dangerouslySetInnerHTML={{ __html: props.html || '<p>HTML content goes here</p>' }} />
      );

    case 'Biography':
      return (
        <div style={baseStyle} className="max-w-2xl">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 rounded-full bg-gray-300 flex-shrink-0" />
            <div>
              <h3 className="text-2xl font-bold mb-1">{props.name || 'Your Name'}</h3>
              <p className="text-gray-600 mb-2">{props.title || 'Your Title'}</p>
              <p className="text-gray-700">{props.bio || 'Your biography goes here...'}</p>
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div style={baseStyle} className="p-4 border-2 border-dashed border-gray-300 rounded text-center">
          <p className="text-gray-500">{type} Component</p>
        </div>
      );
  }
}