#import "GridClock.h"
#import <WebKit/WebKit.h>

@implementation WSView

- (id)initWithFrame:(NSRect)frame isPreview:(BOOL)isPreview {
  if (!(self = [super initWithFrame:frame isPreview:isPreview])) return nil;

  NSURL* indexHTMLDocumentURL = [NSURL URLWithString:[[[NSURL fileURLWithPath:[[NSBundle bundleForClass:self.class].resourcePath stringByAppendingString:@"/index.html"] isDirectory:NO] description] stringByAppendingFormat:@"?screensaver=1%@", self.isPreview ? @"&is_preview=1" : @""]];

  WebView* webView = [[WebView alloc] initWithFrame:NSMakeRect(0, 0, frame.size.width, frame.size.height)];
  webView.drawsBackground = NO; // Avoids a "white flash" just before the index.html file has loaded
  [webView.mainFrame loadRequest:[NSURLRequest requestWithURL:indexHTMLDocumentURL cachePolicy:NSURLRequestUseProtocolCachePolicy timeoutInterval:30.0]];
  [self addSubview:webView];
  
  return self;
}

#pragma mark - ScreenSaverView

- (void)animateOneFrame { [self stopAnimation]; } // We don't need animation callbacks
- (BOOL)hasConfigureSheet { return NO; } // Nothing to configure

#pragma mark - WebFrameLoadDelegate

- (void)webView:(WebView *)sender didFailLoadWithError:(NSError *)error forFrame:(WebFrame *)frame {
  NSLog(@"%@ error=%@", NSStringFromSelector(_cmd), error);
}

// A bunch of methods that captures all the input events to prevent so screensaver exits normally.
#pragma mark Focus Overrides

- (NSView *)hitTest:(NSPoint)aPoint {return self;}
- (void)keyDown:(NSEvent *)theEvent {return;}
- (void)keyUp:(NSEvent *)theEvent {return;}
- (void)mouseDown:(NSEvent *)theEvent {return;}
- (void)mouseUp:(NSEvent *)theEvent {return;}
- (void)mouseDragged:(NSEvent *)theEvent {return;}
- (void)mouseEntered:(NSEvent *)theEvent {return;}
- (void)mouseExited:(NSEvent *)theEvent {return;}
- (BOOL)acceptsFirstResponder {return YES;}
- (BOOL)resignFirstResponder {return NO;}

@end
