import matplotlib.pyplot as plt
import numpy as np

# Generate points for the circle |z - 2i| = 1
theta = np.linspace(0, 2 * np.pi, 100)
x_circle = np.cos(theta)
y_circle = np.sin(theta) + 2

# Plotting the circle
plt.figure(figsize=(8, 8))
plt.plot(x_circle, y_circle, label='|z - 2i| = 1')

# Marking the point z = 1
plt.plot(1, 0, 'ro')  # z = 1 is marked as a red dot
plt.text(1, 0.2, 'z = 1', fontsize=12, color='red')

# Adding labels and title
plt.xlabel('Re(z)')
plt.ylabel('Im(z)')
plt.title('Graph of |z - 2i| = 1 and z = 1')
plt.axhline(0, color='black',linewidth=0.5)
plt.axvline(0, color='black',linewidth=0.5)
plt.grid(color = 'gray', linestyle = '--', linewidth = 0.5)
plt.legend()
plt.axis('equal')

# Display the plot
plt.show()
