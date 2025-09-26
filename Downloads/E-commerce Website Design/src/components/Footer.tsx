import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">ShopHub</h3>
            <p className="text-sm text-muted-foreground">
              Your one-stop destination for premium products and exceptional shopping experience.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Instagram className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-medium">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <Button variant="ghost" className="justify-start p-0 h-auto">About Us</Button>
              <Button variant="ghost" className="justify-start p-0 h-auto">Contact</Button>
              <Button variant="ghost" className="justify-start p-0 h-auto">FAQ</Button>
              <Button variant="ghost" className="justify-start p-0 h-auto">Size Guide</Button>
              <Button variant="ghost" className="justify-start p-0 h-auto">Shipping Info</Button>
            </nav>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="font-medium">Customer Service</h4>
            <nav className="flex flex-col space-y-2">
              <Button variant="ghost" className="justify-start p-0 h-auto">My Account</Button>
              <Button variant="ghost" className="justify-start p-0 h-auto">Order Status</Button>
              <Button variant="ghost" className="justify-start p-0 h-auto">Returns</Button>
              <Button variant="ghost" className="justify-start p-0 h-auto">Privacy Policy</Button>
              <Button variant="ghost" className="justify-start p-0 h-auto">Terms of Service</Button>
            </nav>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-medium">Stay Updated</h4>
            <p className="text-sm text-muted-foreground">
              Subscribe to get special offers and updates.
            </p>
            <div className="flex space-x-2">
              <Input placeholder="Enter your email" className="flex-1" />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm">+1 (555) 123-4567</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm">support@shophub.com</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm">123 Commerce St, City, State 12345</span>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            © 2024 ShopHub. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <span className="text-xs text-muted-foreground">🔒 Secure Payment</span>
            <span className="text-xs text-muted-foreground">🚚 Fast Shipping</span>
            <span className="text-xs text-muted-foreground">↩️ Easy Returns</span>
          </div>
        </div>
      </div>
    </footer>
  );
}