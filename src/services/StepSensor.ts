/**
 * StepSensor Service
 * Handles device motion events to detect steps using a simple peak detection algorithm.
 */

export type StepCallback = (steps: number) => void;

class StepSensor {
  private isTracking: boolean = false;
  private lastX: number = 0;
  private lastY: number = 0;
  private lastZ: number = 0;
  private threshold: number = 12; // Adjust based on testing
  private lastStepTime: number = 0;
  private stepCooldown: number = 300; // ms between steps to avoid double counting
  private onStepDetected: StepCallback | null = null;

  constructor() {
    this.handleMotion = this.handleMotion.bind(this);
  }

  public async requestPermission(): Promise<boolean> {
    if (typeof (DeviceMotionEvent as any).requestPermission === 'function') {
      try {
        const permissionState = await (DeviceMotionEvent as any).requestPermission();
        return permissionState === 'granted';
      } catch (e) {
        console.error('Error requesting DeviceMotion permission:', e);
        return false;
      }
    }
    // For non-iOS or older browsers, assume granted if the event exists
    return 'DeviceMotionEvent' in window;
  }

  public start(callback: StepCallback) {
    if (this.isTracking) return;
    this.onStepDetected = callback;
    this.isTracking = true;
    window.addEventListener('devicemotion', this.handleMotion);
  }

  public stop() {
    this.isTracking = false;
    window.removeEventListener('devicemotion', this.handleMotion);
    this.onStepDetected = null;
  }

  private handleMotion(event: DeviceMotionEvent) {
    if (!event.accelerationIncludingGravity) return;

    const { x, y, z } = event.accelerationIncludingGravity;
    if (x === null || y === null || z === null) return;

    // Calculate total acceleration magnitude
    const acceleration = Math.sqrt(x * x + y * y + z * z);
    const delta = Math.abs(acceleration - 9.81); // Subtract gravity

    const currentTime = Date.now();
    if (delta > this.threshold && (currentTime - this.lastStepTime) > this.stepCooldown) {
      this.lastStepTime = currentTime;
      if (this.onStepDetected) {
        this.onStepDetected(1);
      }
    }

    this.lastX = x;
    this.lastY = y;
    this.lastZ = z;
  }
}

export const stepSensor = new StepSensor();
